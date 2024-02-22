import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";

import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  getIdObservable(): Observable<string | undefined> {
    return this.auth.user?.pipe(map(user => user?.uid));
  }

  getLoggedInUser() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getId() {
    const auth = getAuth();
    return auth.currentUser?.uid;
  }

}
