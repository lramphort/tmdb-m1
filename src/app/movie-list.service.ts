import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, PathReference} from '@angular/fire/database';
import {ListStructure} from './dataTypes/ListStructure';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  idUtilisateur: String;
  lists: AngularFireList<ListStructure>;

  constructor(public onAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.onAuth.user.subscribe( u => {
      this.idUtilisateur = u.uid;
      const listsPath = `lists/${this.idUtilisateur}`;
      this.lists = db.list(listsPath);
    }) ; }


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
    console.log ("truc tout pourrave - addList" + liste);
  }

  renameList (liste: string, newName: string) {
    console.log ("truc tout pourrave - renameList" + newName + liste);
  }

  deleteList (liste: string) {
    console.log ("hasta la vista, baby !" +  liste);
  }


}


