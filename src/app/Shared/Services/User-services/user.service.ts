import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../../Models/User";
import {AuthenticationService} from "../Authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  collectionName = 'Users'

  constructor(private afs: AngularFirestore, private authService: AuthenticationService) { }

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  loadUser() {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', this.authService.getId())).valueChanges();
  }

  getAllExceptLogged() {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '!=', this.authService.getId())).valueChanges();
  }

  getLogged() {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', this.authService.getId())).valueChanges();
  }

  getAllUsers() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).update(user);
  }

  getUserById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }



}
