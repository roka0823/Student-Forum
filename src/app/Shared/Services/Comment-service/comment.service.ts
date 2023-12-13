import { Injectable } from '@angular/core';
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Comment} from "../../Models/Comment";
import {Post} from "../../Models/Post";
import {UploadTaskSnapshot} from "@angular/fire/compat/storage/interfaces";
import {FileUploadService} from "../File-upload/file-upload.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  collectionName = 'Comment'

  constructor(private afs: AngularFirestore,
              private fileUploadService: FileUploadService) {
  }

  getCommentById(commentId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionName, commentId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }

  createComment(comment: Comment) {
    return this.afs.collection<Comment>(this.collectionName).doc(comment.id).set(comment);
  }

  createCommentWithFile(comment: Comment, file?: File): Promise<string | void> {
    return new Promise((resolve, reject) => {
      if (file) {
        this.fileUploadService.uploadFile(file, 'posts').then((snapshot: UploadTaskSnapshot) => {
          snapshot.ref.getDownloadURL().then((url: string) => {
            comment.fileUrl = url;
            this.createComment(comment).then(() => {
              resolve(url); // Resolve with the file URL
            }).catch(reject);
          }).catch(error => {
            console.error('Error getting download URL:', error);
            reject(error);
          });
        }).catch((error: any) => {
          console.error('Error uploading file:', error);
          reject(error);
        });
      } else {
        this.createComment(comment).then(() => {
          resolve(undefined); // Resolve with undefined as there's no file URL
        }).catch(reject);
      }
    });
  }


}

