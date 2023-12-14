import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Shared/Services/User-services/user.service';
import { User } from '../../../Shared/Models/User';
import {Notification} from "../../../Shared/Models/Notification";
import {NotificationService} from "../../../Shared/Services/Notification/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public currentUser!: User;
  public usersNotifications: Notification[] = [];
  loading: boolean = false;

  constructor(private notificationService: NotificationService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadUser();
  }

  loadUser(): void {
    this.userService.loadUser().subscribe((user) => {
      this.currentUser = user[0];
      this.loadNotificationText(this.currentUser);
    });
    this.loading = false;
  }

  loadNotificationText(user: User): void {
    if (user.notifications)
    user.notifications.forEach( userNotification => {
      this.notificationService.loadNotification(userNotification.id).then((notification) => {
        this.usersNotifications.push(notification as Notification);
      });
    });
  }

  notificationSeen(id: string) {
    this.notificationService.notificationIsSeen(id).then(_ => {
      const foundNotification = this.usersNotifications.find(noti => noti.id === id);
      if (foundNotification) {
        foundNotification.isSeen = true;
      }
    });
  }


  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id).then(_ => {
      this.usersNotifications = this.usersNotifications.filter(noti => noti.id !== id);
      this.userService.removeNotificationReference(id);
    });
  }

}
