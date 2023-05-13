import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from "../../Models/User";


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = 'api/students';

  constructor(private http: HttpClient) { }

  getStudentById(id: string): Observable<User> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<User>(url);
  }
}
