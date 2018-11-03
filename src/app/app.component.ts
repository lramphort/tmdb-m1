import { Component } from '@angular/core';
import {TmdbService} from './tmdb.service';
import {MovieResponse} from './tmdb-data/Movie';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _movie: MovieResponse;
  private _user: User;
  private dbData: Observable<any>;

  public sideNavVisible: boolean;

  constructor(private tmdb: TmdbService,
              public anAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router
              ) {
    this.sideNavVisible = false;
    tmdb.init('25ea93320b0ede2eb2ce7b2661886a0e');
    this.anAuth.user.subscribe(u => {
      this._user = u;
    });
  }

  get movie(): MovieResponse {
    return this._movie;
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  login() {
    this.anAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.anAuth.auth.signOut();
    //this._user = undefined;
    this.router.navigate(['']);
  }

  get user(): User {
    return this._user;
  }

  get lists(): Observable<any> {
    return this.dbData;
  }

  toggleSideNav() {

    this.sideNavVisible = !this.sideNavVisible;
    console.log(this.sideNavVisible);
  }
}
// /yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg
