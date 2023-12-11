import { Injectable } from '@angular/core';
import { doc, getDoc, getFirestore } from "@angular/fire/firestore";
import { Subject } from "../../Models/Subject";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {Post} from "../../Models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  collectionName = 'Posts'

  constructor(private afs: AngularFirestore) { }

  getPosts() {
    return this.afs.collection<Post>(this.collectionName).valueChanges();
  }

  getPostById(postId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionName, postId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }
}
