import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {doc, getDoc, getFirestore} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  collectionName = 'Users'

  constructor() { }

  getStudentById(studentId: string): Promise<any> {
    const docRef = doc(getFirestore(), this.collectionName, studentId);
    return getDoc(docRef).then(doc => {
      console.log(doc.data())
      return doc.data();
    });
  }
}
