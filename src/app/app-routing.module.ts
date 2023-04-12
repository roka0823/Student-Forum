import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
      [{ path: 'login', loadChildren: () => import('./Pages/Authentication/login/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./Pages/Authentication/register/register.module').then(m => m.RegisterModule) },
      { path: 'main', loadChildren: () => import('./Pages/Main-pages/main/main.module').then(m => m.MainModule) },
      { path: 'profile', loadChildren: () => import('./Pages/Main-pages/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'students', loadChildren: () => import('./Pages/Main-pages/students/students.module').then(m => m.StudentsModule) },
      { path: 'subjects', loadChildren: () => import('./Pages/Main-pages/subjects/subjects.module').then(m => m.SubjectsModule) },
      { path: 'selected-subject', loadChildren: () => import('./Pages/Main-pages/selected-subject/selected-subject.module').then(m => m.SelectedSubjectModule) },
      { path: 'tutoring', loadChildren: () => import('./Pages/Main-pages/tutoring/tutoring.module').then(m => m.TutoringModule) },
      { path: 'settings', loadChildren: () => import('./Pages/Main-pages/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'not-found', loadChildren: () => import('./Pages/Main-pages/not-found/not-found.module').then(m => m.NotFoundModule) },
      { path: '',  redirectTo: '/main', pathMatch: 'full'},
      { path: '**',  redirectTo: '/not-found', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
