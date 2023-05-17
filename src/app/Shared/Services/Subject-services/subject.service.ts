import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthenticationService} from "../Authentication/authentication.service";
import {UserService} from "../User-services/user.service";
import {Subject} from "../../Models/Subject";
import {Post} from "../../Models/Post";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  collectionName = 'Subjects'
  collectionName2 = 'Posts'

  constructor(private afs: AngularFirestore, private authService: AuthenticationService, private userService: UserService) { }

  getAllSubjects() {
    return this.afs.collection<Subject>(this.collectionName).valueChanges();
  }

  loadSubject(subjectName: string) {
    return this.afs.collection<Subject>(this.collectionName, ref => ref.where('name', '==', subjectName)).valueChanges({ limit: 1 });
  }

  createPost(post: Post) {
    return this.afs.collection<Post>(this.collectionName2).add(post);
  }


  updateSubject(subject: Subject) {
    const query = this.afs.collection<Subject>(this.collectionName, ref => ref.where('name', '==', subject.name));
    return query.get().toPromise().then((querySnapshot) => {
      if (querySnapshot && querySnapshot.size === 1) {
        const docRef = querySnapshot.docs[0].ref;
        return docRef.update(subject);
      } else {
        throw new Error(`Found ${querySnapshot?.size} documents with name "${subject.name}"`);
      }
    });
  }










}
