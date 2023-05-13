import {Component, OnInit} from '@angular/core';
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {Router} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: User[] = [];

  private userSubscription: Subscription | null = null;
  loggedInUser!: User;
  object: Observable<Array<User>>

  constructor(private userService: UserService, private router: Router) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
    this.userService.getAllExceptLogged().subscribe(students => {
      this.students = students;
    });
    this.userSubscription = this.object.pipe(
      map(users => users[0])
    ).subscribe(user => {
      this.loggedInUser = user;
      this.loggedInUser.name.firstName = user.name.firstName;
      this.loggedInUser.name.lastName = user.name.lastName;
      this.loggedInUser.major = user.major;
      this.loggedInUser.semester = user.semester;
      this.loggedInUser.friends = user.friends;
      this.loggedInUser.subjects = user.subjects;
      this.loggedInUser.badges = user.badges;
    });
  }

  goToProfile(user: User) {
    this.router.navigateByUrl(`/students/${user.id}`);
  }

  addFriend(student: User) {
    // Check if the student is already a friend
    if (this.loggedInUser.friends.some(friend => friend.email === student.email)) {
      console.log(`${student.name.firstName} ${student.name.lastName} is already your friend.`);
    } else {
      // Add the student to the friends array in memory
      this.loggedInUser.friends.push(student);

      // Update the friends array in the database
      this.userService.update(this.loggedInUser)
        .then(() => {
          console.log(`${student.name.firstName} ${student.name.lastName} has been added to your friends.`);
        })
        .catch(error => {
          console.error('Error updating user document:', error);
        });
    }
  }




  writeMessage(student: User) {
    // implement your logic for writing a message
  }
}

