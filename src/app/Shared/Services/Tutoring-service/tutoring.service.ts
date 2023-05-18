import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TutoringPost} from "../../Models/Tutoring-post";
import {User} from "../../Models/User";

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

  update(post: TutoringPost) {
    return this.afs.collection<TutoringPost>(this.collectionName).doc(post.id).update(post);
  }

  deletePost(post: TutoringPost) {
    const documentRef = this.afs.collection<TutoringPost>(this.collectionName).doc(post.id);
    return documentRef.delete();
  }


}
