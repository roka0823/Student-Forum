import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationService} from "../Services/Authentication/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  loggedInUser?: firebase.default.User | null;

  constructor(private location: Location, private router: Router, private authService: AuthenticationService) {
  }

  openSidenav: any;
  urlParam: any;

  goBack() {
    this.location.back();
  }

  getPathName() {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    let titleName = '';
    switch (segments[1]) {
      case 'main':
        titleName = 'Főoldal';
        break;
      case 'not-found':
        titleName = "Hűha! Ilyen oldalt nem találtam";
        break;
      case 'profile':
        titleName = "Profil";
        break;
      case 'students':
        titleName = "Személyek";
        break;
      case 'subjects':
        titleName = "Tantárgyak";
        break;
      case 'tutoring':
        titleName = "Korrepetálás";
        break;
      case 'settings':
        titleName = "Beállítások";
        break;
      case 'notifications':
        titleName = "Értesítések"
        break;
      default:
        titleName = "";
        break;
    }
    return titleName;
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

  onLogin() {
    this.router.navigateByUrl('/login');
  }

}
