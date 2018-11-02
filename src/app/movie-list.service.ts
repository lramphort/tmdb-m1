import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, AngularFireObject, PathReference} from '@angular/fire/database';
import {ListStructure} from './dataTypes/ListStructure';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  private user: Observable<User>;
  private uid: string;
  private listsRef: AngularFireList<ListStructure> = null;

  constructor(public anAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.user = this.anAuth.user;

    this.user.subscribe( u => {

      if (u) {
        this.uid = u.uid;
        this.listsRef = db.list(`users/${this.uid}/lists`, ref => ref.orderByChild('name'));
      } else {
        this.listsRef = null;
        this.uid = null;
      }

    }) ;
  }

  getUser(): Observable<User> {
    return this.user;
  }

  getUserLists(): AngularFireList<ListStructure> {
    return this.listsRef;
  }

  getList(key: string): AngularFireObject<ListStructure> {
    return this.db.object(`users/${this.uid}/lists/${key}`);
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



  private displayError(err: any) {
    console.log(err);
  }
}



