import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
import {Comment} from "../../../Shared/Models/Comment";
import {PostsService} from "../../../Shared/Services/Posts-service/posts.service";
import {CommentService} from "../../../Shared/Services/Comment-service/comment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-selected-subject',
  templateUrl: './selected-subject.component.html',
  styleUrls: ['./selected-subject.component.scss']
})
export class SelectedSubjectComponent implements OnInit, AfterViewInit, OnDestroy{
  public subject!: Subject;
  posts: Post[] = [];
  comments: Comment[] = [];
  loading = false;
  newCommentForm = new FormGroup({
    text: new FormControl(''),
    author: new FormControl(''),
    time: new FormControl(''),
  })

  postCommentMap = new Map<string, string[]>();

  subscription?: Subscription;


  constructor(
    private newPostDialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    private subjectService: SubjectService,
    private postsService: PostsService,
    public commentService: CommentService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadPosts();
  }

  ngAfterViewInit(): void {
    console.log(this.postCommentMap);
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

  private getSubjectName() {
    const urlParts = window.location.pathname.split('/');
    const subjectName = decodeURI(urlParts[urlParts.length - 1]).replace('%20', ' ');
    return subjectName;
  }

  private async getSubject(subjectId: string): Promise<void> {
    let subject = await this.subjectService.getPostsFromId(subjectId);
    this.subject = subject
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
          this.subjectService.createPost(forumPost);
          if (forumPost.id) {
            this.subject.posts.push(forumPost.id);
            this.subjectService.updateSubject(this.subject);
          }
        }
      });
    });
  }

  async submitComment(postId: string) {
    let currentPost = await this.postsService.getPostById(postId)
      this.userService.loadUser().subscribe((users: User[]) => {
        const currentUser = users[0];
        const newComment: Comment = {
          id: uuid.v4(),
          text: this.newCommentForm.get('text')!.value as string,
          author: currentUser.id,
          time: firebase.firestore.Timestamp.now()
        };
        console.log(currentPost)
        if (newComment.id) {
          console.log('Az Új comment', newComment)
          currentPost.comments.push(newComment.id);
          this.commentService.createComment(newComment);
        }
        this.subjectService.updatePost(currentPost);
        this.newCommentForm.reset();
      });
  }

  commentPostPair(commentId: string, postId: string): boolean {
    if (this.postCommentMap.has(postId)) {
      return this.postCommentMap.get(postId)!.some(comment => comment === commentId);
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    console.log("leiratkoztunk");
  }



}
