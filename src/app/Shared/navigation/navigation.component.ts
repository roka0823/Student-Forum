import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(private location: Location) {
  }
  openSidenav: any;

  goBack() {
    this.location.back();
  }

  logOut() {

  }
}
