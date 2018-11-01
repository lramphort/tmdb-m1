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
  private listsRef: AngularFireList<ListStructure> = null;

  constructor(public anAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.user = this.anAuth.user;

    this.user.subscribe( u => {

      if (u) {
        this.listsRef = db.list(`users/${u.uid}/lists`);
      } else {
        this.listsRef = null;
      }

    }) ;
  }

  getUser(): Observable<User> {
    return this.user;
  }

  getUserLists(): AngularFireList<ListStructure> {
    return this.listsRef;
  }

  createList(list: ListStructure): void {
    this.listsRef.push(list);
  }

  updateList(key: string, value: any): void {
    this.listsRef.update(key, value).catch(err => this.displayError(err));
  }

  deleteList(key: string): void {
    this.listsRef.remove(key).catch(err => this.displayError(err));
  }

  addMovie(liste: string, idMovie: number) {
  }

  deleteMovie(liste: string, idMovie: number) {
  }

  addList (liste: string) {
  }



  /*getList (listeName: string): Observable<ListStructure[]> {

  }*/

  private displayError(err: any) {
    console.log(err);
  }
}



