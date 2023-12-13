import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {PostsService} from "../../../Shared/Services/Posts-service/posts.service";
import {Post} from "../../../Shared/Models/Post";
import {Subject} from "../../../Shared/Models/Subject";
import {SubjectService} from "../../../Shared/Services/Subject-services/subject.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public user!: User;
  public posts: Post[] = [];
  public subjects: Subject[] = [];

  constructor(private userService: UserService,
              private postService: PostsService,
              private subjectService: SubjectService,
              private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadUser();
    this.getNews();
  }

  loadUser() {
    this.userService.loadUser().subscribe( user => {
      this.user = user[0];
    });
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe( subjects => {
      console.log(subjects)
      this.subjects = subjects;
      this.cdRef.detectChanges();
    });
  }

  getNews(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;

      if (this.user && this.user.subjects) {
        this.posts = this.posts.filter(post => this.user.subjects.includes(post.subject));
      }
      this.posts.sort((a, b) => (b.time.toDate() as any) - (a.time.toDate() as any));
    });
  }


  getSubject(subjectId: string): Subject | undefined {
    return this.subjects.find((subject) => subject.id === subjectId);
  }
}
