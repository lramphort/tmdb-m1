import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {User} from 'firebase';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public _user: User;


  constructor(public anAuth: AngularFireAuth,
              private router: Router) {
    this.anAuth.user.subscribe(u => {
      this._user = u;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.anAuth.auth.signOut();
    //this._user = undefined;
    this.router.navigate(['']);
  }

}
