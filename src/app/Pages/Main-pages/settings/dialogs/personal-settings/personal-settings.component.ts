import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../../../../../Shared/Models/User";
import {UserService} from "../../../../../Shared/Services/User-services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../../../../Shared/Services/Authentication/authentication.service";
import {Notification} from "../../../../../Shared/Models/Notification";

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss']
})
export class PersonalSettingsComponent implements OnInit{


  updateForm = new FormGroup({
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    nickName: new FormControl(''),
  });

  object: Observable<Array<User>>

  email!: string;
  lastName!: string;
  firstName!: string;
  semester!: string;
  major!: string;
  friends!: string[];
  subjects!: string[];
  badges!: string[];
  nickName!: string;
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
      this.notifications = user.notifications;
    });
  }

  onSave() {
    const firstName = this.updateForm.get('name.firstName')?.value;
    const lastName = this.updateForm.get('name.lastName')?.value;
    const nickName = this.updateForm.get('nickName')?.value;

    // Get the current user ID
    const userId = this.authService.getId();

    // Create a new User object with the updated values
    const updatedUser: User = {
      id: userId as string,
      email: '',
      major: this.major as string,
      semester: this.semester as string,
      friends: this.friends,
      subjects: this.subjects,
      badges: this.badges as string[],
      name: {
        firstName: firstName as string,
        lastName: lastName as string,
      },
      nickName: nickName as string,
      notifications: this.notifications,
      isAdmin: false
    };

    // Call the update() method of the UserService to update the user in the database
    this.userService.update(updatedUser)
      .then(() => {
        window.alert('Sikeres módosítás')

      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });

  }
}
