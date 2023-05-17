import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "../../../Shared/Models/Subject";
import {SubjectService} from "../../../Shared/Services/Subject-services/subject.service";
import {map, Observable, Subscription} from "rxjs";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnDestroy{

  subjects: Subject[] = [];
  private userSubscription: Subscription | null = null;
  loggedInUser!: User;
  object: Observable<Array<User>>
  constructor(private router: Router, private subjectService: SubjectService, private userService: UserService) {
    this.object = this.userService.loadUser()
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
    this.userSubscription = this.object.pipe(
      map(users => users[0])
    ).subscribe(user => {
      this.loggedInUser = user;
      this.loggedInUser.name.firstName = user.name.firstName;
      this.loggedInUser.name.lastName = user.name.lastName;
      this.loggedInUser.major = user.major;
      this.loggedInUser.semester = user.semester;
      this.loggedInUser.friends = user.friends;
      this.loggedInUser.subjects = user.subjects;
      this.loggedInUser.badges = user.badges;
    });
  }

  goToSubjectPage(subject: Subject) {
    const encodedSubjectName = encodeURI(subject.name);
    this.router.navigateByUrl(`/subjects/${encodedSubjectName}`);
  }



  joinSubjectForum(newSubject: Subject) {
    if (this.loggedInUser.subjects.some(subject => subject.name === newSubject.name)) {
      window.alert(`${newSubject.name} is already your subject.`);
    } else {
      this.loggedInUser.subjects.push(newSubject);
      this.userService.update(this.loggedInUser)
        .then(() => {
          window.alert(`${newSubject.name} has been added to your subjects.`);
        })
        .catch(error => {
          console.error('Error updating user document:', error);
        });
      console.log(newSubject.name + ' ' + newSubject.joinedUsers)
      newSubject.joinedUsers++;
      console.log(newSubject.name + ' ' + newSubject.joinedUsers)
      this.subjectService.updateSubject(newSubject).then(() => {
        console.log('updated');
      }).catch(error => {
        console.log(error);
      });
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  isUserJoinedSubject(newSubject: Subject): boolean {
    if (this.loggedInUser && this.loggedInUser.subjects && this.loggedInUser.subjects.some(subject => subject.name === newSubject.name)) {
      return true;
    } else {
      return false
    }
  }

}
