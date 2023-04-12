import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedSubjectRoutingModule } from './selected-subject-routing.module';
import { SelectedSubjectComponent } from './selected-subject.component';


@NgModule({
  declarations: [
    SelectedSubjectComponent
  ],
  imports: [
    CommonModule,
    SelectedSubjectRoutingModule
  ]
})
export class SelectedSubjectModule { }
