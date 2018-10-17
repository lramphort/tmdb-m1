import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList, PathReference} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  idUtilisateur: String;
  lists: AngularFireList<Object>;

  constructor(public onAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.onAuth.user.subscribe( u => {
      this.idUtilisateur = u.uid;
      const listsPath = `lists/${this.idUtilisateur}`;
      this.lists = db.list(listsPath);
    }) ; }


  addMovie(liste: String, idMovie: number) {
    console.log ("truc tout pourrave - addMovie" + idMovie + liste);
  }

  deleteMovie(liste: String, idMovie: number) {
    //if movie is in list
    console.log ("truc tout pourrave - deleteMovie" + idMovie + liste);
  }

  addList (liste: String) {
    this.lists.push(liste);
    console.log ("truc tout pourrave - addList" + liste);
  }

  renameList (liste: String, newName: String) {
    console.log ("truc tout pourrave - renameList" + newName + liste);
  }

  deleteList (liste: String) {
    console.log ("hasta la vista, baby !" +  liste);
  }
}


