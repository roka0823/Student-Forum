import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { PersonalSettingsComponent } from './dialogs/personal-settings/personal-settings.component';
import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import { StudiesSettingsComponent } from './dialogs/studies-settings/studies-settings.component';
import { OtherSettingsComponent } from './dialogs/other-settings/other-settings.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    SettingsComponent,
    PersonalSettingsComponent,
    ChangePasswordComponent,
    StudiesSettingsComponent,
    OtherSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class SettingsModule { }
