import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PersonalSettingsComponent} from "./dialogs/personal-settings/personal-settings.component";
import {ChangePasswordComponent} from "./dialogs/change-password/change-password.component";
import {StudiesSettingsComponent} from "./dialogs/studies-settings/studies-settings.component";
import {OtherSettingsComponent} from "./dialogs/other-settings/other-settings.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private newPostDialog: MatDialog) {
  }

  onOpenDialogPersonal() {
    const dialogRef = this.newPostDialog.open(PersonalSettingsComponent, {
      width: '50%',
      height: '50%',
    });
  }

  onOpenDialogPassword() {
    const dialogRef = this.newPostDialog.open(ChangePasswordComponent, {
      width: '50%',
      height: '50%',
    });
  }

  onOpenDialogStudies() {
    const dialogRef = this.newPostDialog.open(StudiesSettingsComponent, {
      width: '50%',
      height: '50%',
    });
  }

  onOpenDialogOther() {
    const dialogRef = this.newPostDialog.open(OtherSettingsComponent, {
      width: '50%',
      height: '50%',
    });
  }
}
