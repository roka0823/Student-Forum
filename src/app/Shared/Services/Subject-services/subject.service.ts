import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Subject} from "../../Models/Subject";
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";
import {catchError, from, map, Observable, of, switchMap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  collectionNameSubject = 'Subjects'
  collectionNameComment = 'Comments'

  constructor(private afs: AngularFirestore) {
  }

  getAllSubjects() {
    return this.afs.collection<Subject>(this.collectionNameSubject).valueChanges();
  }

  loadSubject(subjectName: string): Observable<string | null> {
    if (!subjectName) {
      return of(null);
    }

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


  getSubjectNameById(subjectId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionNameSubject, subjectId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }

  updateSubject(subject: Subject) {
    if (!subject.name) {
      return throwError(new Error('Subject name is undefined.'));
    }

    const query = this.afs.collection<Subject>(
      this.collectionNameSubject,
      (ref) => ref.where('name', '==', subject.name)
    );

    return from(query.get()).pipe(
      switchMap((querySnapshot) => {
        if (querySnapshot && querySnapshot.size === 1) {
          const docRef = querySnapshot.docs[0].ref;
          return from(docRef.update(subject));
        } else {
          const errorMessage = `Found ${querySnapshot?.size} documents with name "${subject.name}"`;
          return throwError(new Error(errorMessage));
        }
      }),
      catchError((error) => {
        console.error('Error updating subject:', error);
        return throwError(error);
      })
    );
  }

  getPostsFromId(postId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionNameSubject, postId);
    return getDoc(docRef).then(doc => {
      return doc.data();
    });
  }

}
