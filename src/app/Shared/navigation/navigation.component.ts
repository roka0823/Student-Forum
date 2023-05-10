import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationService} from "../Services/Authentication/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  loggedInUser?: firebase.default.User | null;

  constructor(private location: Location, private router: Router, private authService: AuthenticationService) {
  }
  openSidenav: any;

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    })
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error()
    });
  }

}
