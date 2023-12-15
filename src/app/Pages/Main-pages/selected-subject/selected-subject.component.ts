import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
import {FormControl, FormGroup} from "@angular/forms";
import * as uuid from 'uuid';
import {v4 as uuidv4} from 'uuid';
import {Comment} from "../../../Shared/Models/Comment";
import {PostsService} from "../../../Shared/Services/Posts-service/posts.service";
import {CommentService} from "../../../Shared/Services/Comment-service/comment.service";
import {Subscription} from "rxjs";
import {Notification} from "../../../Shared/Models/Notification";
import {NotificationService} from "../../../Shared/Services/Notification/notification.service";

@Component({
  selector: 'app-selected-subject',
  templateUrl: './selected-subject.component.html',
  styleUrls: ['./selected-subject.component.scss']
})
export class SelectedSubjectComponent implements OnInit,  OnDestroy{
  public subject!: Subject;
  posts: Post[] = [];
  comments: Comment[] = [];
  users: User[] = [];
  loading = false;
  file: File | null = null;
  newCommentForm = new FormGroup({
    text: new FormControl(''),
    author: new FormControl(''),
    time: new FormControl(''),
  })

  postCommentMap = new Map<string, string[]>();
  subscription?: Subscription;
  uploadedFileName?: string;


  constructor(
    private newPostDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    private subjectService: SubjectService,
    private postsService: PostsService,
    private commentService: CommentService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadPosts();
    this.loadUsers();
  }

  private loadPosts() {
    this.postCommentMap = new Map<string, string[]>();
    this.subjectService.loadSubject(this.getSubjectName()).subscribe((subjectId) => {
      if (subjectId) {
        this.getSubject(subjectId);
      }
      this.loading = false;
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe( users => {
      this.users = users;
    })
  }

  getUser(commentAuthorId: string): User | undefined {
    return this.users.find((user) => user.id === commentAuthorId);
  }

  getAuthorName(commentAuthorId: string): string {
    const author = this.getUser(commentAuthorId);
    if (author) {
      return author.name.lastName + " " + author.name.firstName;
    } else {
      return "Unknown";
    }
  }

  private getSubjectName() {
    const urlParts = window.location.pathname.split('/');
    return decodeURI(urlParts[urlParts.length - 1]).replace('%20', ' ');
  }

  private async getSubject(subjectId: string): Promise<void> {
    this.subject = await this.subjectService.getPostsFromId(subjectId)
    this.posts = [];
    this.subject.posts.forEach( (post) => {
      this.getPosts(post);
    })
  }

  private async getPosts(postId: string): Promise<void> {
    let post: Post | undefined = await this.postsService.getPostById(postId);

    if (post) {
      this.comments = [];
      if (post.comments) {
        post.comments.forEach((comment) => {
          this.getComments(comment, postId);
        })
      }
      this.posts.push(post);
      this.postCommentMap.set(postId, []);
    }
  }

  private async getComments(commentId: string, postId: string): Promise<void> {
    let comment = await this.commentService.getCommentById(commentId);
    this.postCommentMap.get(postId)!.push(commentId);
    this.comments.push(comment);
  }

  public onOpenDialog() {
    const dialogRef = this.newPostDialog.open(NewPostComponent, {
      width: '70%',
      height: '90%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      const titleP = result.title;
      const descriptionP = result.description
      const currentUserIdP = this.authService.getId();
      if (!currentUserIdP) {
        return;
      }
      this.subscription = this.userService.getUserById(currentUserIdP).subscribe((currentUser) => {
        if (!currentUser) {
          return;
        }
        if (this.subject.id) {
          const forumPost: Post = {
            id: uuid.v4(),
            title: titleP,
            author: currentUser.id,
            authorLastName: currentUser.name.lastName,
            authorFirstName: currentUser.name.firstName,
            time: firebase.firestore.Timestamp.now(),
            description: descriptionP,
            subject: this.subject.id,
            comments: [],
          };
          this.postsService.createPost(forumPost);
          if (forumPost.id) {
            this.subject.posts.push(forumPost.id);
            this.subjectService.updateSubject(this.subject);
          }
        }
      });
    });
  }

  async submitComment(post: Post) {
    let currentPost = await this.postsService.getPostById(post.id);
    this.userService.loadUser().subscribe((users: User[]) => {
      const currentUser = users[0];
      const newComment: Comment = {
        id: uuid.v4(),
        text: this.newCommentForm.get('text')!.value as string,
        author: currentUser.id,
        time: firebase.firestore.Timestamp.now(),
        fileUrl: '',
        fileName: ''
      };
      const notification = {
        isSeen: false,
        text: (currentUser.name.lastName + " " + currentUser.name.firstName + " Válaszolt a posztodra a " + this.subject.name + " szerveren!"),
        id: uuidv4(),
      } as Notification;
      this.notificationService.createNotification(notification);
      const author = this.userService.getUserById(post.author);
      author.subscribe(author => {
        author?.notifications.push(notification);
        if (author) this.userService.update(author);
      })

      if (this.file) {
        this.commentService.createCommentWithFile(newComment, this.file);
      } else {
        this.commentService.createComment(newComment);
      }
      this.postCommentMap.get(post.id)!.push(newComment.id);
      this.comments.push(newComment);
      currentPost.comments.push(newComment.id);
      this.postsService.updatePost(currentPost);
      this.newCommentForm.reset();
      this.cdRef.detectChanges();
    });
  }


  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.file = target.files[0];
    }
    if (this.file)
    this.uploadedFileName = this.file?.name;
  }

  commentPostPair(commentId: string, postId: string): boolean {
    if (this.postCommentMap.has(postId)) {
      return this.postCommentMap.get(postId)!.some(comment => comment === commentId);
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  isImageFile(fileName: string): boolean {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp']; // Add more if needed

    const lowerCaseFileName = fileName.toLowerCase();
    return imageExtensions.some(ext => lowerCaseFileName.endsWith(`.${ext}`));
  }

}
