import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, PathReference} from '@angular/fire/database';
import {ListStructure} from './dataTypes/ListStructure';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  private user: Observable<User>;
  private lists: AngularFireList<ListStructure>;

  constructor(public anAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.user = this.anAuth.user;

    this.user.subscribe( u => {

      if (u) {
        this.lists = db.list(`users/${u.uid}/lists`);
      } else {
        this.lists = undefined;
      }

      }) ;
  }

  getUser(): Observable<User> {
    return this.user;
  }

  addMovie(liste: string, idMovie: number) {
    console.log ("truc tout pourrave - addMovie" + idMovie + liste);
  }

  deleteMovie(liste: string, idMovie: number) {
    //if movie is in list
    console.log ("truc tout pourrave - deleteMovie" + idMovie + liste);
  }

  addList (liste: string) {
    const l: ListStructure = {name: liste};
    this.lists.push(l);
  }

  getUserLists(): Observable<ListStructure[]> {
    return this.lists.valueChanges();
  }

  test() {
    console.log("Testr");

  }

  renameList (liste: string, newName: string) {
    console.log ("truc tout pourrave - renameList" + newName + liste);
  }

  deleteList (liste: string) {
    console.log ("hasta la vista, baby !" +  liste);
  }
  /*
  isInList (liste : string, idMovie: number){

  }
  */
}


