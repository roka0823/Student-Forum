import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {PostsService} from "../../../Shared/Services/Posts-service/posts.service";
import {Post} from "../../../Shared/Models/Post";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public user!: User;
  public posts: Post[] = [];

  constructor(private userService: UserService,
              private postService: PostsService) {}

  ngOnInit(): void {
    this.loadUser();
    this.getNews();
  }

  loadUser() {
    this.userService.loadUser().subscribe( user => {
      this.user = user[0];
    });
  }

  getNews() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;

      // Assuming this.user.subjects is an array of subjects for the current user
      if (this.user && this.user.subjects) {
        this.posts = this.posts.filter(post => this.user.subjects.includes(post.subject));
      }

      this.posts.sort((a, b) => (b.time.toDate() as any) - (a.time.toDate() as any));
    });
  }

  logPost() {
    console.log(this.posts);
  }
}
