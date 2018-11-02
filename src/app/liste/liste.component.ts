import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {DialogDeleteListComponent, DialogData} from '../lists-manager-element/lists-manager-element.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-liste-component',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  currentList: ListStructure;
  editMode: boolean;
  newName: string;

  constructor(private route: ActivatedRoute,
              private mls: MovieListService,
              public anAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.mls.getUser().subscribe(u => {
        if (u) {
          this.mls.getList(params['key']).snapshotChanges().pipe(
            map( changes => {
              return ({key: params['key'], ...changes.payload.val()});
            })
          ).subscribe(l => {
            this.currentList = l;
          });
        }
      });

    });
  }

  delete() {
    const dialogRef = this.dialog.open(DialogDeleteListComponent, {
      width: '300px',
      data: {key: this.currentList.key}
    });
  }

  addFilmsTempo() {

    this.mls.addMovie(this.currentList, 105);
    this.mls.addMovie(this.currentList, 165);
    this.mls.addMovie(this.currentList, 196);

  }

  changeName() {
    this.mls.updateList(this.currentList.key, {name: this.newName});
    this.editMode = false;
  }

}
