import {Injectable} from '@angular/core';
import {doc, getDoc, getFirestore, updateDoc} from "@angular/fire/firestore";
import {Notification} from "../../Models/Notification";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private collectionName = "Notifications"

  constructor(private afs: AngularFirestore) { }

  createNotification(notification: Notification) {
    return this.afs.collection<Notification>(this.collectionName).doc(notification.id).set(notification);
  }

  loadNotification(notificationId: string) {
    const docRef = doc(getFirestore(), this.collectionName, notificationId);

    return getDoc(docRef).then((doc) => {
      return doc.data() as { text: string; id: string /* other properties */ } as Notification;
    });
  }

  async notificationIsSeen(notificationId: string) {
    const docRef = doc(getFirestore(), this.collectionName, notificationId);
    const docSnapshot = await getDoc(docRef);
    const currentData = docSnapshot.data() as Notification;
    const updatedData = { ...currentData, isSeen: true };
    await updateDoc(docRef, updatedData);
  }

  async deleteNotification(notificationId: string) {
    const documentRef = this.afs.collection<Notification>(this.collectionName).doc(notificationId);
    return documentRef.delete();
  }

}
