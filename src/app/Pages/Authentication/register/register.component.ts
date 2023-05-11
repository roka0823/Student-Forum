import { Component } from '@angular/core';
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {User} from "../../../Shared/Models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  felev: any;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    rePassword: new FormControl(''),
    major: new FormControl(''),
    semester: new FormControl(''),
  });

  constructor(private auth: AuthenticationService,
              private userService: UserService,
              private router: Router) {
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    if (email && password) {
      this.auth.register(email, password).then(cred => {
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          email: this.registerForm.get('email')?.value as string,
          name: {
            firstName: this.registerForm.get('name.firstName')?.value as string,
            lastName: this.registerForm.get('name.lastName')?.value as string
          },
          nickName: '',
          major: this.registerForm.get('major')?.value as string,
          semester: this.registerForm.get('semester')?.value as string,
          friends: [],
          subjects: [],
          badges: ['Beta Tester']
        };
        this.userService.create(user).then(_ => {
          console.log('User added successfully');
          this.router.navigateByUrl('/profile')
        }).catch(error => {
          console.error(error);
        })
      }).catch(error => {
        console.error(error);
      });
    }
  }

}
