import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewPostPopupDialogComponent} from "./new-post-popup-dialog/new-post-popup-dialog.component";
import {MassageDialogComponent} from "./massage-dialog/massage-dialog.component";

@Component({
  selector: 'app-tutoring',
  templateUrl: './tutoring.component.html',
  styleUrls: ['./tutoring.component.scss']
})
export class TutoringComponent {

  constructor(private newPostDialog: MatDialog) {
  }
  onOpenDialog() {
    const dialogRef = this.newPostDialog.open(NewPostPopupDialogComponent, {
      width: '70%',
      height: '90%',
    });
  }

  writeMassage() {
    const dialogRef = this.newPostDialog.open(MassageDialogComponent, {
      width: '70%',
      height: '90%',
    });
  }

  onStartTutoring() {

  }
}
