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


@Component({
  selector: 'app-tutoring',
  templateUrl: './tutoring.component.html',
  styleUrls: ['./tutoring.component.scss']
})
export class TutoringComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription | null = null;
  private dialogSubscription: Subscription | null = null;
  tutoringPosts: TutoringPost[] = [];
  users: User[] = [];

  constructor(
    private newPostDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private tutorService: TutoringService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) {
  }


  onOpenDialog() {
    const dialogRef = this.newPostDialog.open(NewPostPopupDialogComponent, {
      width: '70%',
      height: '90%',
      data: {newPostDialog: this.newPostDialog}
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      const wantP = result.want
      const topicP = result.topic
      const offerP = result.offer
      const descriptionP = result.description
      console.log('Dialog closed:', result);
      const currentUserId = this.authService.getId();
      if (!currentUserId) {
        return;
      }
      this.userSubscription = this.userService.getUserById(currentUserId).subscribe((currentUser) => {
        if (!currentUser) {
          console.log('currentUser is undefined')
          return;
        }
        const tutoringPost: TutoringPost = {
          want: wantP,
          topic: topicP,
          offer: offerP,
          description: descriptionP as string,
          author: currentUser,
          time: firebase.firestore.Timestamp.now(),
        };
        this.tutorService.createPost(tutoringPost).then((docRef) => {
          console.log('Post added successfully with ID:', docRef.id);
          tutoringPost.id = docRef.id; // set the id property after it has been created
        }).catch(error => {
          console.error(error);
        })
      });
    });
  }


  writeMassage() {
    const dialogRef = this.newPostDialog.open(MassageDialogComponent, {
      width: '70%',
      height: '90%',
    });
  }

  onStartTutoring() {
    console.log(this.tutoringPosts[0].author.name)
  }

  getUser(authorId: string): User | undefined {
    return this.users.find((user) => user.id === authorId);
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

  private tutoringPostsSubscription!: Subscription;

  ngOnInit(): void {
    this.tutoringPostsSubscription = this.tutorService.getAllPosts().subscribe(tutoringPosts => {
      this.tutoringPosts = tutoringPosts.sort((a, b) => b.time.toMillis() - a.time.toMillis());
      this.cdRef.detectChanges();
    });
    this.userService.getAllUsers().pipe(take(1)).subscribe((users) => {
      this.users = users;
      this.cdRef.detectChanges();
    });
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

  deletePost(postId: string): void {
    this.tutorService.deletePost(postId).then(() => {
      console.log('Post deleted successfully');
    }).catch(error => {
      console.error(error);
    });
  }
}
