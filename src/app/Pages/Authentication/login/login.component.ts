import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loadingSubscription?: Subscription;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:  new FormControl('', Validators.required),
  });

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.loading = true;
    if (email && password) {
      this.authService.login(email, password).then(cred => {
        console.log(cred.user?.uid);
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.router.navigateByUrl('/main');
      })
    }
  }
}
