import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { newPostDialog: MatDialog },
              public dialogRef: MatDialogRef<NewPostComponent>) {
  }

  newPostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    time: new FormControl(''),
  })


  onNewPostSubmit() {
    const postData = this.newPostForm.value;
    this.dialogRef.close(postData);
  }


}
