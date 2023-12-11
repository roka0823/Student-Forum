import { Injectable } from '@angular/core';
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Comment} from "../../Models/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  collectionName = 'Comment'
  constructor(private afs: AngularFirestore) { }

  getCommentById(commentId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionName, commentId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }

  public getCommentAuthor(commentId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionName, commentId);
    return getDoc(docRef).then(doc => {
      const commentData = doc.data();
      // Check if commentData is not null/undefined before accessing fields
      if (commentData) {
        const author = commentData['author'];
        return author;
      } else {
        // Handle the case where the document is not found or has no data
        return null; // or throw an error, return a default value, etc.
      }
    });
  }

  createComment(comment: Comment) {
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }
}
