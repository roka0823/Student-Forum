import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewPostPopupDialogComponent} from "./new-post-popup-dialog/new-post-popup-dialog.component";
import {MassageDialogComponent} from "./massage-dialog/massage-dialog.component";
import {TutoringPost} from "../../../Shared/Models/Tutoring-post";
import {Router} from "@angular/router";
import {TutoringService} from "../../../Shared/Services/Tutoring-service/tutoring.service";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {User} from "../../../Shared/Models/User";
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import firebase from "firebase/compat/app";
import {Subscription, take} from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import {NotificationService} from "../../../Shared/Services/Notification/notification.service";
import {Notification} from "../../../Shared/Models/Notification";

@Component({
  selector: 'app-tutoring',
  templateUrl: './tutoring.component.html',
  styleUrls: ['./tutoring.component.scss']
})
export class TutoringComponent implements OnInit, OnDestroy {

  menu: number = 1;
  loading = true;
  tutoringPosts: TutoringPost[] = [];
  users: User[] = [];
  private userSubscription: Subscription | null = null;
  private dialogSubscription: Subscription | null = null;
  private tutoringPostsSubscription!: Subscription;
  constructor(
    private newPostDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private tutorService: TutoringService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.tutoringPostsSubscription = this.tutorService.getAllPosts().subscribe(tutoringPosts => {
      this.tutoringPosts = tutoringPosts.sort((a, b) => b.time.toMillis() - a.time.toMillis());
      this.cdRef.detectChanges();
    });
    this.userService.getAllUsers().pipe(take(1)).subscribe((users) => {
      this.users = users;
      this.cdRef.detectChanges();
      this.loading = false;
    });
  }

  onOpenDialog() {
    const dialogRef = this.newPostDialog.open(NewPostPopupDialogComponent, {
      width: '70%',
      height: '90%',
      data: { newPostDialog: this.newPostDialog }
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const wantP = result.want;
      const topicP = result.topic;
      const offerP = result.offer;
      const descriptionP = result.description;
      const currentUserId = this.authService.getId();

      if (!currentUserId) {
        return;
      }

      this.getName(currentUserId);
      this.userSubscription = this.userService.getUserById(currentUserId).subscribe((currentUser) => {
        if (!currentUser) {
          return;
        }

        const tutoringPost: TutoringPost = {
          id: uuidv4(),
          want: wantP,
          topic: topicP,
          offer: offerP,
          description: descriptionP as string,
          author: currentUser.id,
          time: firebase.firestore.Timestamp.now(),
          active: false
        };

        this.tutorService.createPost(tutoringPost);
      });
    });
  }

  getName(id: string) {
    this.userService.getUserName(id).then( () => {
    })
  }

  writeMassage() {
    const dialogRef = this.newPostDialog.open(MassageDialogComponent, {
      width: '70%',
      height: '90%',
    });
  }

  onStartTutoring(post: TutoringPost) {
    post.active = true;
    post.acceptedUser = this.currentUserId;
    this.tutorService.update(post);
    const notification = {
      isSeen: false,
      text: (this.users[0].name.lastName + " " + this.users[0].name.firstName + " elfogadta a korrepetálási kérésed, beszéljétek meg a továbbiakat!"),
      id: uuidv4(),
    } as Notification;
    this.notificationService.createNotification(notification);
    const author = this.userService.getUserById(post.author);
    author.subscribe(author => {
      author?.notifications.push(notification);
      if (author) this.userService.update(author);
    })
  }

  getUser(authorId: string): User | undefined {
    return this.users.find((user) => user.id === authorId);
  }

  getAuthorLastName(authorId: string): string {
    const author = this.getUser(authorId);
    if (author) {
      return author.name.lastName;
    } else {
      return "Unknown";
    }
  }

  getAuthorFirstName(authorId: string): string {
    const author = this.getUser(authorId);
    if (author) {
      return author.name.firstName;
    } else {
      return "Unknown";
    }
  }

  getAuthorName(authorId: string): string {
    const author = this.getUser(authorId);
    if (author) {
      return author.name.lastName + " " + author.name.firstName;
    } else {
      return "Unknown";
    }
  }

  public get currentUserId(): string | undefined {
    return this.authService.getId();
  }

  ngOnDestroy(): void {
    if (this.tutoringPostsSubscription) {
      this.tutoringPostsSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  deletePost(post: TutoringPost): void {
    this.tutorService.deletePost(post)
  }

  setMenu(value: number) {
    this.menu = value;
  }
  getMenu() {
    return this.menu;
  }
}
