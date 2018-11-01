import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreationCompteDialogComponent/*, {
      width: '250px'
    }*/);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialogRef: MatDialogRef<CreationCompteDialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    }, {matchPasswords: this.matchPasswords});
  }

  matchPasswords(c: AbstractControl): { [key: string]: boolean } {
    if (c.get('password').value !== c.get('password2').value) {
      return {matchPasswords: true};
    }
  }


  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.authService.createAccount(this.form.controls.email.value, this.form.controls.password.value)
      .then((res) => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch((err) => console.log('ERREUR creation-compte: ' + err));
    this.dialogRef.close();

  }

}

