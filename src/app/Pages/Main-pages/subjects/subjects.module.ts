import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    SubjectsComponent
  ],
    imports: [
        CommonModule,
        SubjectsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class SubjectsModule { }
