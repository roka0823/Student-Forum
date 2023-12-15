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
      this.loading = false;
    });
  }

  goToProfile(user: User) {
    this.router.navigateByUrl(`/students/${user.id}`);
  }

  async addFriend(student: User) {
    if (
      this.loggedInUser.friends &&
      this.loggedInUser.friends.some((friend) => friend === student.id)
    ) {
      window.alert(`${student.name.firstName} ${student.name.lastName} is already your friend.`);
    } else {
      if (this.loggedInUser.friends) {
        this.loggedInUser.friends.push(student.id);
      }
      try {
        await this.userService.update(this.loggedInUser);
        window.alert(`${student.name.firstName} ${student.name.lastName} has been added to your friends.`);

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
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}

