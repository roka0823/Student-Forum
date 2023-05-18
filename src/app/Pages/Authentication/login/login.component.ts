import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import {FormControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  email = new FormControl('');
  password = new FormControl('');
  loadingSubscription?: Subscription;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    const email = this.email.value || '';
    const password = this.password.value || '';
    this.authService.login(email, password).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
    }).catch(error => {
    });
  }


  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
