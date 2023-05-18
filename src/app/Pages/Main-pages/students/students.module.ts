import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    StudentsComponent
  ],
    imports: [
        CommonModule,
        StudentsRoutingModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class StudentsModule { }
