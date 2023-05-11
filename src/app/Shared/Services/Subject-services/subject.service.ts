import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthenticationService} from "../Authentication/authentication.service";
import {UserService} from "../User-services/user.service";
import {User} from "../../Models/User";
import {Subject} from "../../Models/Subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  collectionName = 'Subjects'

  constructor(private afs: AngularFirestore, private authService: AuthenticationService, private userService: UserService) { }

  getAllSubjects() {
    return this.afs.collection<Subject>(this.collectionName).valueChanges();
  }

}
