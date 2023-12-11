import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Subject} from "../../Models/Subject";
import {Post} from "../../Models/Post";
import {User} from "../../Models/User";
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import {catchError, from, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  collectionNameSubject = 'Subjects'
  collectionNamePost = 'Posts'
  collectionNameComment = 'Comments'

  constructor(private afs: AngularFirestore) {
  }

  getAllSubjects() {
    return this.afs.collection<Subject>(this.collectionNameSubject).valueChanges();
  }

  loadSubject(subjectName: string): Observable<string | null> {
    return this.afs
      .collection<Subject>(this.collectionNameSubject, ref => ref.where('name', '==', subjectName))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as Subject;
            return { id, ...data };
          });
        }),
        map(dataArray => {
          const firstData = dataArray.length > 0 ? dataArray[0] : null;
          return firstData ? firstData.id : null;
        })
      );
  }



  createPost(post: Post) {
    console.log('POSZT KREÁLÓDOTT!')
    return this.afs.collection<Post>(this.collectionNamePost).doc(post.id).set(post);
  }

  updatePost(post: Post) {
    return this.afs.collection<User>(this.collectionNamePost).doc(post.id).update(post);
  }

  getSubjectNameById(subjectId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionNameSubject, subjectId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }

  updateSubject(subject: Subject) {
    const query = this.afs.collection<Subject>(this.collectionNameSubject, ref => ref.where('name', '==', subject.name));
    return query.get().toPromise().then((querySnapshot) => {
      if (querySnapshot && querySnapshot.size === 1) {
        const docRef = querySnapshot.docs[0].ref;
        return docRef.update(subject);
      } else {
        throw new Error(`Found ${querySnapshot?.size} documents with name "${subject.name}"`);
      }
    });
  }

  getPostsFromId(postId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionNameSubject, postId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }

}
