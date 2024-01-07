import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../../../../../Shared/Models/User";
import {UserService} from "../../../../../Shared/Services/User-services/user.service";
import {AuthenticationService} from "../../../../../Shared/Services/Authentication/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Notification} from "../../../../../Shared/Models/Notification";

@Component({
  selector: 'app-studies-settings',
  templateUrl: './studies-settings.component.html',
  styleUrls: ['./studies-settings.component.scss']
})
export class StudiesSettingsComponent implements OnInit{


  updateStudiesForm = new FormGroup({
    major: new FormControl(''),
    semester: new FormControl(''),
  });

  object: Observable<Array<User>>
  email!: string;
  nickName!: string;
  lastName!: string;
  firstName!: string;
  semester!: string;
  major!: string;
  friends!: string[];
  subjects!: string[];
  badges!: string[];
  notifications!: Notification[];

  constructor(private userService: UserService, private authService: AuthenticationService) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
    this.object.pipe(
      map(users => users[0])
    ).subscribe(user => {
      this.email = user.email;
      this.lastName = user.name.lastName;
      this.firstName = user.name.firstName;
      this.major = user.major;
      this.semester = user.semester;
      this.friends = user.friends;
      this.subjects = user.subjects;
      this.badges = user.badges;
      this.nickName = user.nickName;
      this.notifications = user.notifications
    });
  }

  onSave() {
    const major = this.updateStudiesForm.get('major')?.value;
    const semester = this.updateStudiesForm.get('semester')?.value;

    const userId = this.authService.getId();

    const updatedUser: User = {
      id: userId as string,
      email: '',
      major: major as string,
      semester: semester as string,
      friends: this.friends,
      subjects: this.subjects,
      badges: this.badges as string[],
      name: {
        firstName: this.firstName as string,
        lastName: this.lastName as string,
      },
      nickName: this.nickName as string,
      notifications: this.notifications,
      isAdmin: false
    };

    this.userService.update(updatedUser)
      .then(() => {
        window.alert('Sikeres módosítás')

      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });

  }
}

