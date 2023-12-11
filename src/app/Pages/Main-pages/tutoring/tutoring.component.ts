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
import * as stream from "stream";


interface name {
  firstName: string,
  lastName: string,
}

@Component({
  selector: 'app-tutoring',
  templateUrl: './tutoring.component.html',
  styleUrls: ['./tutoring.component.scss']
})
export class TutoringComponent implements OnInit, OnDestroy {

  menu: number = 1;
  loading = false;
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
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.tutoringPostsSubscription = this.tutorService.getAllPosts().subscribe(tutoringPosts => {
      console.log('Történt egy subscribe:)')
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
        console.log('Dialog closed without saving');
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
          console.log('currentUser is undefined');
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
    this.userService.getUserName(id).then( result => {
      console.log(result);
    })
  }

  writeMassage() {
    const dialogRef = this.newPostDialog.open(MassageDialogComponent, {
      width: '70%',
      height: '90%',
    });
  }

  onStartTutoring(post: TutoringPost) {
    post.active = false;
    console.log(post.id)
    this.tutorService.update(post);
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
      console.log('tutoringPostsSubscription = unsubscribed')
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      console.log('userSubscription = unsubscribed')
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
      console.log('dialogSubscription = unsubscribed')
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
