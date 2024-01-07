import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../../Models/User";
import {AuthenticationService} from "../Authentication/authentication.service";
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import {Observable, of, switchMap, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users'

  constructor(private afs: AngularFirestore, private authService: AuthenticationService) { }

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  loadUser(): Observable<User[]> {
    return this.authService.getIdObservable().pipe(
      take(1),
      switchMap(userId => {
        if (userId) {
          return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', userId)).valueChanges().pipe(take(1));
        } else {
          return of([]);
        }
      })
    );
  }

  getAllExceptLogged() {
    return this.authService.getIdObservable().pipe(
      take(1),
      switchMap(userId => {
        if (userId) {
          return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '!=', userId)).valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  getAllUsers() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).update(user);
  }

  getUserById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges().pipe(take(1));
  }

  getUserName(userId: string): Promise<object> {
    const docRef = doc(getFirestore(), this.collectionName, userId);

    return getDoc(docRef).then((doc) => {
      const post = doc.data() as User;
      return post.name;
    });
  }

  removeNotificationReference(notificationId: string) {
    const userId = this.authService.getId();

    // Get the user document
    const userDoc = this.afs.collection<User>(this.collectionName).doc(userId);

    // Update the user document to remove the reference to the deleted notification
    userDoc.get().toPromise().then((userSnapshot) => {
      const userData = userSnapshot?.data() as User;

      // Remove the reference from the notifications array
      userData.notifications = userData.notifications.filter(noti => noti.id !== notificationId);

      // Update the user document with the modified notifications array
      userDoc.update(userData);
    });
  }


}
