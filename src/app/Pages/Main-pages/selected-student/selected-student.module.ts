import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedStudentRoutingModule } from './selected-student-routing.module';
import { SelectedStudentComponent } from './selected-student.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    SelectedStudentComponent
  ],
    imports: [
        CommonModule,
        SelectedStudentRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class SelectedStudentModule { }
