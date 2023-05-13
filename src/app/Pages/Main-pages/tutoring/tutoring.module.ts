import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutoringRoutingModule } from './tutoring-routing.module';
import { TutoringComponent } from './tutoring.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { NewPostPopupDialogComponent } from './new-post-popup-dialog/new-post-popup-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TutoringComponent,
    NewPostPopupDialogComponent
  ],
    imports: [
        CommonModule,
        TutoringRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})
export class TutoringModule { }
