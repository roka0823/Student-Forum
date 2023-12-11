import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../Shared/Services/Student-services/student.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../Shared/Models/User";
import {UserService} from "../../../Shared/Services/User-services/user.service";
import {Subject} from "../../../Shared/Models/Subject";

@Component({
  selector: 'app-selected-student',
  templateUrl: './selected-student.component.html',
  styleUrls: ['./selected-student.component.scss']
})
export class SelectedStudentComponent implements OnInit{


  student: User | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  major: string | null = null;
  subjects: string[] | null = null;
  friends: string[] | null = null;
  badges: string[] | null = null;
  semester: string | null = null;
  loading = false;
    constructor(private router: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
      this.loading = true;
      const studentId = this.router.snapshot.paramMap.get('id');
      console.log(studentId)
      if (studentId !== null) {
        this.userService.getUserById(studentId).subscribe(student => {
          if (student) {
          console.log(student)
          this.student = student;
          this.subjects = student.subjects;
          this.friends = student.friends;
          this.badges = student.badges;
          this.firstName = student.name.firstName;
          this.lastName = student.name.lastName;
          this.major = student.major;
          this.semester = student.semester;
          this.loading = false;
        }
      })
      }
  }
}
