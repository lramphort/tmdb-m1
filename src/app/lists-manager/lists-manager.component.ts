import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogData} from '../connexion/connexion.component';




@Component({
  selector: 'app-lists-manager',
  templateUrl: './lists-manager.component.html',
  styleUrls: ['./lists-manager.component.css']
})
export class ListsManagerComponent implements OnInit {
  addingList: boolean;
  newListe: string;
  userLists: any;


  constructor(private router: Router, public listService: MovieListService) {
    this.listService.getUser().subscribe( u => {
      if (u) {
        this.listService.getUserLists().snapshotChanges().pipe(
          map( changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          })
        ).subscribe(lists => {
          this.userLists = lists;
        });
      }
    });

  }

  ngOnInit() {
  }

  createList() {
    const l: ListStructure = new ListStructure();
    l.name = this.newListe;
    this.listService.createList(l);
    this.addingList = false;
    this.newListe = "";
  }

}



