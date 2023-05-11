import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {user} from "@angular/fire/auth";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  object: Observable<Array<User>>

  lastName!: String;
  firstName!: String;
  semester!: String;
  major!: String;
  friends!: String[];
  subjects!: String[];
  badges!: String[];
  constructor(private userService: UserService) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
  this.object.pipe(
      map(users => users[0])
    ).subscribe(user => {
      this.lastName = user.name.lastName;
      this.firstName = user.name.firstName;
      this.major = user.major;
      this.semester = user.semester;
      this.friends = user.friends;
      this.subjects = user.subjects;
      this.badges = user.badges;
    });
  }
}
