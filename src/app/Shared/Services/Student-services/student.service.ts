import { Injectable } from '@angular/core';
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
      return doc.data();
    });
  }
}
