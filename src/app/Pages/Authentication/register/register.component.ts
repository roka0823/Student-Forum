import { Component } from '@angular/core';
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";

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
    rePassword: new FormControl(''),
    major: new FormControl(''),
    semester: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  });

  constructor(private auth: AuthenticationService) {
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    if (email && password) {
      this.auth.register(email, password).then(cred => {
        console.log(cred);
      }).catch(error => {
        console.error(error);
      });
    }
  }

}
