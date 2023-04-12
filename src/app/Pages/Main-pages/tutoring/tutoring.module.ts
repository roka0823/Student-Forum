import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutoringRoutingModule } from './tutoring-routing.module';
import { TutoringComponent } from './tutoring.component';


@NgModule({
  declarations: [
    TutoringComponent
  ],
  imports: [
    CommonModule,
    TutoringRoutingModule
  ]
})
export class TutoringModule { }
