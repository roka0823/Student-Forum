import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationService} from "../Services/Authentication/authentication.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public loggedInUser?: firebase.default.User;
  public isMobile: boolean = false;
  public sidenavOpen: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

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
    this.authService.getLoggedInUser().subscribe(user => {
      if (user !== null) {
        this.loggedInUser = user;
      }
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 756;
    if (this.isMobile) {
      this.sidenav.mode = 'over'; // Set mode to 'over' for mobile
      this.sidenav.close(); // Close sidenav for mobile view
    } else {
      this.sidenav.mode = 'side'; // Set mode to 'side' for desktop
      this.sidenav.open(); // Open sidenav for desktop view
    }
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
    this.sidenav.toggle();
  }
}
