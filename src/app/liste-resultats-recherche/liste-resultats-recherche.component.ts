import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';

@Component({
  selector: 'app-liste-resultats-films',
  templateUrl: './liste-resultats-recherche.component.html',
  styleUrls: ['./liste-resultats-recherche.component.css']
})
export class ListeResultatsRechercheComponent implements OnInit {
  currentSearchRes: SearchMovieResponse;
  currentPeopleSearchRes: SearchPeopleResponse;
  constructor(private routeur: Router,
              private route: ActivatedRoute,
              private tmdb: TmdbService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tmdb.searchMovie({
        language: "fr-FR",
        query: params['searchText']
      }).then(
        res => {

          this.currentSearchRes = res;
        }
      );

      this.tmdb.searchPerson({
        query: params['searchText']
      }).then(
        res => {
          this.currentPeopleSearchRes = res;
        }
      );

    });
  }

}
