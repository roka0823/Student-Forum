import { Injectable } from '@angular/core';
import { doc, getDoc, getFirestore } from "@angular/fire/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {Post} from "../../Models/Post";
import {User} from "../../Models/User";
import {FileUploadService} from "../File-upload/file-upload.service";
import {UploadTaskSnapshot} from "@angular/fire/compat/storage/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  collectionName = 'Posts'

  constructor(private afs: AngularFirestore,
              private fileUploadService: FileUploadService) { }

  createPost(post: Post) {
    return this.afs.collection<Post>(this.collectionName).doc(post.id).set(post);
  }

  createPostWithFile(post: Post, file?: File): void {
    if (file) {
      this.fileUploadService.uploadFile(file, 'posts').then((snapshot: UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then((url: string) => {
          post.fileUrl = url;
          this.createPost(post);
        });
      });
    } else {
      this.createPost(post);
    }
  }

  updatePost(post: Post) {
    return this.afs.collection<User>(this.collectionName).doc(post.id).update(post);
  }

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
