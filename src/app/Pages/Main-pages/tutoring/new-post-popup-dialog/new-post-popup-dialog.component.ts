import {Component, Inject } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-new-post-popup-dialog',
  templateUrl: './new-post-popup-dialog.component.html',
  styleUrls: ['./new-post-popup-dialog.component.scss']
})
export class NewPostPopupDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { newPostDialog: MatDialog },
              public dialogRef: MatDialogRef<NewPostPopupDialogComponent>) {
  }

  newPostForm = new FormGroup({
    want: new FormControl(''),
    topic: new FormControl(''),
    offer: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    time: new FormControl(''),
  })


  onNewPostSubmit() {
    const postData = this.newPostForm.value;
    this.dialogRef.close(postData);
  }

}
