import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectedSubjectComponent } from './selected-subject.component';

const routes: Routes = [{ path: '', component: SelectedSubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectedSubjectRoutingModule { }
