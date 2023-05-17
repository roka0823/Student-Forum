import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TutoringPost} from "../../Models/Tutoring-post";

@Injectable({
  providedIn: 'root'
})
export class TutoringService {

  collectionName = 'TutoringPosts'
  constructor(private afs: AngularFirestore) { }

  createPost(tutoringPost: TutoringPost) {
    return this.afs.collection<TutoringPost>(this.collectionName).add(tutoringPost);
  }

  getAllPosts() {
    return this.afs.collection<TutoringPost>(this.collectionName).valueChanges();
  }

  deletePost(postId: string) {
    return this.afs.collection<TutoringPost>(this.collectionName).doc(postId).delete();
  }


}
