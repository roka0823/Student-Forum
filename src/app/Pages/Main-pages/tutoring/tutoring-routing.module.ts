import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutoringComponent } from './tutoring.component';

const routes: Routes = [{ path: '', component: TutoringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutoringRoutingModule { }
