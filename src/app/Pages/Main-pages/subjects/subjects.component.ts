import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "../../../Shared/Models/Subject";
import {SubjectService} from "../../../Shared/Services/Subject-services/subject.service";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit{

  subjects: Subject[] = [];
  constructor(private router: Router, private subjectService: SubjectService) {
  }

  goToSubjectPage() {
    this.router.navigateByUrl("/selected-subject")
  }

  joinSubjectForum() {

  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(subjects => {
      this.subjects = subjects;
    })
  }
}
