import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./Shared/Services/Authguard/auth.guard";

const routes: Routes =
      [{ path: 'login', loadChildren: () => import('./Pages/Authentication/login/login.module').then(m => m.LoginModule), },
      { path: 'register', loadChildren: () => import('./Pages/Authentication/register/register.module').then(m => m.RegisterModule) },
      { path: 'main', loadChildren: () => import('./Pages/Main-pages/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
      { path: 'profile', loadChildren: () => import('./Pages/Main-pages/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
      { path: 'students', loadChildren: () => import('./Pages/Main-pages/students/students.module').then(m => m.StudentsModule), canActivate: [AuthGuard] },
      { path: 'subjects', loadChildren: () => import('./Pages/Main-pages/subjects/subjects.module').then(m => m.SubjectsModule), canActivate: [AuthGuard] },
      { path: 'subjects/:name', loadChildren: () => import('./Pages/Main-pages/selected-subject/selected-subject.module').then(m => m.SelectedSubjectModule), canActivate: [AuthGuard] },
      { path: 'students/:id', loadChildren: () => import('./Pages/Main-pages/selected-student/selected-student.module').then(m => m.SelectedStudentModule), canActivate: [AuthGuard] },
      { path: 'tutoring', loadChildren: () => import('./Pages/Main-pages/tutoring/tutoring.module').then(m => m.TutoringModule), canActivate: [AuthGuard] },
      { path: 'settings', loadChildren: () => import('./Pages/Main-pages/settings/settings.module').then(m => m.SettingsModule),canActivate: [AuthGuard] },
      { path: 'not-found', loadChildren: () => import('./Pages/Main-pages/not-found/not-found.module').then(m => m.NotFoundModule),canActivate: [AuthGuard] },
      { path: '',  redirectTo: '/main', pathMatch: 'full'},
      { path: 'notifications', loadChildren: () => import('./Pages/Main-pages/notifications/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuard] },
      { path: '**',  redirectTo: '/not-found', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
