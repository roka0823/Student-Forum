import { Component, OnInit } from '@angular/core';
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllExceptLogged().subscribe(students => {
      this.students = students;
    });
  }

  goToProfile(student: User) {
    // implement your logic for navigating to the student's profile
  }

  addFriend(student: User) {
    // implement your logic for adding a friend
  }

  writeMessage(student: User) {
    // implement your logic for writing a message
  }
}

