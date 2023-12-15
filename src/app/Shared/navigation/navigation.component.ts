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

  goBack() {
    this.location.back();
  }

  getPathName() {
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    let titleName: string;
    switch (segments[1]) {
      case 'main':
        titleName = 'Főoldal';
        break;
      case 'not-found':
        titleName = "Hűha! Ez az oldal nem létezik";
        break;
      case 'profile':
        titleName = "Profil";
        break;
      case 'students':
        titleName = "Személyek";
        break;
      case 'subjects':
        if (segments[2]) {
          titleName = "Tantárgyak | " + (decodeURIComponent(segments[2]));
        } else {
          titleName = "Tantárgyak";
        }
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
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    })
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

}
