import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectedSubjectRoutingModule } from './selected-subject-routing.module';
import { SelectedSubjectComponent } from './selected-subject.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewPostComponent } from './new-post/new-post.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    SelectedSubjectComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    SelectedSubjectRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class SelectedSubjectModule { }
