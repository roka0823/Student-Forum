import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, map, Observable, Subscription} from "rxjs";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {Router} from "@angular/router";
import {SubjectService} from "../../../Shared/Services/Subject-services/subject.service";
import {StudentService} from "../../../Shared/Services/Student-services/student.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{

  private subscription: Subscription | null = null;
  user!: User;
  object: Observable<Array<User>>
  isHovered = false;
  loading = true;

  mySubjects: string[] = [];
  myFriends: User[] = [];
  constructor(private userService: UserService,
              private router: Router,
              private subjectService: SubjectService,
              private studentService: StudentService) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
    this.subscription = this.object.pipe(map((users) => users[0])).subscribe((user) => {
      this.user = user;

      const subjectPromises = this.user.subjects.map((subject) => this.getSubjectName(subject));
      const friendPromises = this.user.friends.map((friend) => this.getStudent(friend));

      forkJoin([...subjectPromises, ...friendPromises]).subscribe(() => {
        this.loading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goToProfile(user: User) {
    this.router.navigateByUrl(`/students/${user.id}`);
  }

  goToSubjectPage(subject: string) {
    this.router.navigateByUrl(`/subjects/${subject}`);
  }

  async getStudent(studentId: string): Promise<void> {
    let student = await this.studentService.getStudentById(studentId);
    this.myFriends.push(student);
  }

  async getSubjectName(subjectId: string): Promise<void> {
    let subject = await this.subjectService.getSubjectNameById(subjectId);
    this.mySubjects.push(subject.name);
  }
}
