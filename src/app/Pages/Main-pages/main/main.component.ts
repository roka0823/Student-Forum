import {Component, OnInit, OnDestroy} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  object: Observable<Array<User>>
  lastName!: string;
  firstName!: string;
  private subscription: Subscription | null = null;

  constructor(private userService: UserService) {
    this.object = this.userService.loadUser();
  }

  ngOnInit(): void {
    this.subscription = this.object.pipe(
      map(users => users[0])
    ).subscribe(user => {
      this.lastName = user.name.lastName;
      this.firstName = user.name.firstName;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
