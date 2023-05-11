import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../../../../../Shared/Models/User";
import {UserService} from "../../../../../Shared/Services/User-services/user.service";
import {AuthenticationService} from "../../../../../Shared/Services/Authentication/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";

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
  email!: String;
  nickName!: String;
  lastName!: String;
  firstName!: String;
  semester!: String;
  major!: String;
  friends!: String[];
  subjects!: String[];
  badges!: String[];

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
    });
  }

  onSave() {
    const major = this.updateStudiesForm.get('major')?.value;
    const semester = this.updateStudiesForm.get('semester')?.value;

    // Get the current user ID
    const userId = this.authService.getId();

    // Create a new User object with the updated values
    const updatedUser: User = {
      id: userId as string,
      email: '',
      major: major as string,
      semester: semester as string,
      friends: this.friends as string[],
      subjects: this.subjects as string[],
      badges: this.badges as string[],
      name: {
        firstName: this.firstName as string,
        lastName: this.lastName as string,
      },
      nickName: this.nickName as string,
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

