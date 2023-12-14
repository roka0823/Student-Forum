import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {Subject} from "../../../Shared/Models/Subject";
import {SubjectService} from "../../../Shared/Services/Subject-services/subject.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-selected-student',
  templateUrl: './selected-student.component.html',
  styleUrls: ['./selected-student.component.scss']
})
export class SelectedStudentComponent implements OnInit {
  student!: User;
  loading = false;
  subjects: Subject[] = [];
  users: User[] = [];
  currentUser!: User;

  constructor(private activatedRouter: ActivatedRoute,
              private userService: UserService,
              private subjectService: SubjectService,
              private router: Router)
  {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadStudent();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadStudent();
    this.loadSubjects();
    this.loadAllUser();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    this.userService.loadUser().subscribe( user => {
      this.currentUser = user[0];
    } )
  }

  loadStudent(): void {
    const studentId = this.activatedRouter.snapshot.paramMap.get('id');
    if (studentId !== null) {
      this.userService.getUserById(studentId).subscribe(student => {
        if (student) {
          this.student = student;
          this.loading = false;
        }
      })
    }
  }

  loadSubjects(): void {
    this.subjectService.getAllSubjects().subscribe( subject => {
      subject.forEach( current => this.subjects.push(current));
    });
  }

  loadAllUser(): void {
    this.userService.getAllUsers().subscribe( users => {
      users.forEach( current => this.users.push(current));
    });
  }

  getSubject(subjectId: string): Subject | undefined {
    return this.subjects.find((subject) => subject.id === subjectId);
  }

  getSubjectName(subjectId: string): string {
    const subject = this.getSubject(subjectId);
    if (subject) {
      return subject.name;
    } else {
      return "Unknown";
    }
  }

  getFriend(authorId: string): User | undefined {
    return this.users.find((user) => user.id === authorId);
  }

  getFriendName(authorId: string): string {
    const author = this.getFriend(authorId);
    if (author) {
      return author.name.lastName + " " + author.name.firstName;
    } else {
      return "Unknown";
    }
  }

  goToSubjectPage(subject: string) {
    this.router.navigateByUrl(`/subjects/${subject}`);
  }

  goToProfile(user: string) {
    this.router.navigate(['/students', user]);
  }

}
