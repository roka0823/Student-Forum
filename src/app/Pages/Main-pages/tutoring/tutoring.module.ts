import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutoringRoutingModule } from './tutoring-routing.module';
import { TutoringComponent } from './tutoring.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    TutoringComponent
  ],
    imports: [
        CommonModule,
        TutoringRoutingModule,
        MatButtonModule,
        MatCardModule
    ]
})
export class TutoringModule { }
