import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';

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
          this.db.list<ListStructure>(`users/${u.uid}/lists`, ref => {
            return ref.limitToFirst(1).orderByChild('name').equalTo(params['key']);
          }).valueChanges().subscribe(lists => {
            this.currentList = lists[0];
          });
        }
      });


    });

    /*this.route.queryParams.subscribe(params => {
      console.log(params['name']);
      this.mls.getUser().subscribe(user => {
        if (user) {

          console.log(this.mls.getRawLists().query);

          this.mls.getUserLists().subscribe(lists => {
            const idListe = lists.findIndex(l => l.name === params['name']);
            // this.currentList = lists.filter(l => l.name === params['name'])[0];
            this.currentList = lists[idListe];

            lists[idListe].name = "CLICK";
          });
        }
      });


    });*/



      /*this.tmdb.searchMovie({
        language: "fr-FR",
        query: params['searchText']
      }).then(
        res => {

          this.currentSearchRes = res;
        }
      );

    });*/
  }

}
