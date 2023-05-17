import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, take} from "rxjs";
import {SubjectService} from "../../../Shared/Services/Subject-services/subject.service";
import {Subject} from "../../../Shared/Models/Subject";
import {User} from "../../../Shared/Models/User";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../Shared/Services/Authentication/authentication.service";
import {Post} from "../../../Shared/Models/Post";
import firebase from "firebase/compat/app";
import {NewPostComponent} from "./new-post/new-post.component";

@Component({
  selector: 'app-selected-subject',
  templateUrl: './selected-subject.component.html',
  styleUrls: ['./selected-subject.component.scss']
})
export class SelectedSubjectComponent implements OnInit, OnDestroy{
  description: any = 'Sziasztok! Segítséget szeretnék kérni ebben aaaaaaaaaaa aaaaaa a aaaaa a a aaaaa aaa aaa aaaaaaa aaaa aaa aaa a assssssa dasd asd asd sadsad asdsd  a a ';
  time: any = '2023:05:13 13:12';
  author: any = 'Kis Pista';
  showComment = false;
  text: any= 'Nagyon szépen köszönöm';

  subjects: Subject[] = [];
  posts: Post[] = [];
  private subjectSubscription: Subscription | null = null;

  private userSubscription: Subscription | null = null;
  private dialogSubscription: Subscription | null = null;
  users: User[] = [];

  constructor(
    private newPostDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    private subjectService: SubjectService
  ) {
  }

  onOpenDialog() {
    const dialogRef = this.newPostDialog.open(NewPostComponent, {
      width: '70%',
      height: '90%',
      data: {newPostDialog: this.newPostDialog}
    });
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      const titleP = result.title;
      const descriptionP = result.description
      const currentUserIdP = this.authService.getId();
      if (!currentUserIdP) {
        return;
      }
      this.userSubscription = this.userService.getUserById(currentUserIdP).subscribe((currentUser) => {
        if (!currentUser) {
          console.log('currentUser is undefined')
          return;
        }
        const forumPost: Post = {
          title: titleP,
          author: currentUser,
          time: firebase.firestore.Timestamp.now(),
          description: descriptionP,
          comments: [],
        };
        this.subjectService.createPost(forumPost).then((docRef) => {
          console.log('Post added successfully with ID:', docRef.id);
          forumPost.id = docRef.id;
        }).catch(error => {
          console.error(error);
        })
        this.subjects[0].posts.push(forumPost);
        this.subjectService.updateSubject(this.subjects[0]);
      });
    });
  }

  getSubjectName() {
    const urlParts = window.location.pathname.split('/');
    const subjectName = decodeURI(urlParts[urlParts.length - 1]).replace('%20', ' ');
    return subjectName;
  }

  ngOnInit(): void {
    this.subjectSubscription = this.subjectService.loadSubject(this.getSubjectName()).subscribe(subjects => {
      this.subjects = subjects;
      this.subjects[0].posts
    });
    this.userService.getAllUsers().pipe(take(1)).subscribe((users) => {
      this.users = users;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

}
