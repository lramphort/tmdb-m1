import {Component, Inject, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

export interface DialogData {
  email: string;
  password: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ConnexionDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed : ' + result);
    });
  }

}

@Component({
  selector: 'app-connexion-dialog',
  templateUrl: './connexion-dialog.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionDialogComponent {
  public form: FormGroup;
  @Input() email: string;
  @Input() password: string;

  constructor(
    public authService: AuthService,
    public anAuth: AngularFireAuth,
    public router: Router,
    public dialogRef: MatDialogRef<ConnexionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  connectWithGoogle() {
    this.anAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  connectWithFacebook() {
    this.anAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  connectWithTwitter() {
    this.anAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.authService.signInRegular(this.form.controls.email.value, this.form.controls.password.value)
      .then((res) => {
        console.log('connexion réussie : ' + res);
        //this.router.navigate(['/']);
        })
      .catch((err) => console.log('ERREUR connexion: ' + err));
    this.dialogRef.close();
  }

}

