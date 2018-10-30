import {Component, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface DialogData {
  email: string;
  password: string;
  password2: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent {

  email: string;
  password: string;
  password2: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreationCompteDialogComponent, {
      width: '250px',
      data: {email: this.email, password: this.password, password2: this.password2}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'app-creation-compte-dialog',
  templateUrl: './creation-compte-dialog.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteDialogComponent {
  public form: FormGroup;
  @Input() email: string;
  @Input() password: string;
  @Input() password2: string;

  constructor(
    public dialogRef: MatDialogRef<CreationCompteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    if (this.data.password !== this.data.password2) {

    }
  }

}

