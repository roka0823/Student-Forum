import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectedStudentComponent } from './selected-student.component';

const routes: Routes = [{ path: '', component: SelectedStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectedStudentRoutingModule { }
