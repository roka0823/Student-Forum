import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {Router} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: User[] = [];

  private userSubscription: Subscription | null = null;
  loggedInUser!: User;
  object: Observable<Array<User>>
  loading = false;

  constructor(private userService: UserService, private router: Router) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
    this.loading = true;
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
      this.loading = false;
    });
  }

  goToProfile(user: User) {
    this.router.navigateByUrl(`/students/${user.id}`);
  }

  async addFriend(student: User) {
    // Check if the student is already a friend
    if (
      this.loggedInUser.friends &&
      this.loggedInUser.friends.some((friend) => friend === student.id)
    ) {
      window.alert(`${student.name.firstName} ${student.name.lastName} is already your friend.`);
    } else {
      // Add the student's ID to the friends array in memory
      if (this.loggedInUser.friends) {
        this.loggedInUser.friends.push(student.id);
      }

      // Update the friends array in the database
      try {
        await this.userService.update(this.loggedInUser);
        window.alert(`${student.name.firstName} ${student.name.lastName} has been added to your friends.`);

        // Add the logged-in user's ID to the friend's array
        student.friends.push(this.loggedInUser.id);
        await this.userService.update(student);
      } catch (error) {
        console.error('Error updating user document:', error);
      }
    }
  }

  isUserAlreadyFriend(newFriend: User): boolean {
    return (
      this.loggedInUser &&
      this.loggedInUser.friends &&
      this.loggedInUser.friends.includes(newFriend.id)
    );
  }

  writeMessage(student: User) {
    // implement your logic for writing a message
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}

