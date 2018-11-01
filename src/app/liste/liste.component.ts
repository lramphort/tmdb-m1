import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-liste-component',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  currentList: ListStructure;

  constructor(private route: ActivatedRoute, private mls: MovieListService, public anAuth: AngularFireAuth,
              private db: AngularFireDatabase) { }

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

}
