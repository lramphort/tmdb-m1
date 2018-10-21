import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-liste-resultats-films',
  templateUrl: './liste-resultats-films.component.html',
  styleUrls: ['./liste-resultats-films.component.css']
})
export class ListeResultatsFilmsComponent implements OnInit {
  currentSearchRes: SearchMovieResponse;
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

    });
  }

}
