import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatCardModule } from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MatCardModule,
        MatListModule,
        MatProgressSpinnerModule
    ]
})
export class MainModule { }
