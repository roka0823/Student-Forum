import {Injectable} from '@angular/core';
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Comment} from "../../Models/Comment";
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

  async createCommentWithFile(comment: Comment, file?: File): Promise<void> {
    try {
      if (file) {
        const snapshot: UploadTaskSnapshot = await this.fileUploadService.uploadFile(file, 'Posts');

        comment.fileUrl = await snapshot.ref.getDownloadURL();
        comment.fileName = file.name;
      }

      await this.createComment(comment);
    } catch (error) {
      console.error('Error in createCommentWithFile:', error);
    }
  }

}

