import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {user} from "@angular/fire/auth";
import {object} from "@angular/fire/database";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{

  private subscription: Subscription | null = null;
  user!: User;
  object: Observable<Array<User>>
  lastName!: String;
  firstName!: String;
  semester!: String;
  major!: String;
  friends!: User[];
  subjects!: String[];
  badges!: String[];
  isHovered = false;
  constructor(private userService: UserService, private router: Router) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
    this.subscription = this.object.pipe(
      map(users => users[0])
    ).subscribe(user => {
      this.user = user;
      this.lastName = user.name.lastName;
      this.firstName = user.name.firstName;
      this.major = user.major;
      this.semester = user.semester;
      this.friends = user.friends;
      this.subjects = user.subjects;
      this.badges = user.badges;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  goToProfile(user: User) {
    this.router.navigateByUrl(`/students/${user.id}`);
  }
}
