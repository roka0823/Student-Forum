import {Component} from '@angular/core';
import {AuthenticationService} from "./Shared/Services/Authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Diak-forum';


  constructor() {
  }

}
