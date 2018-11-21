import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';
import {MovieGenre} from '../tmdb-data/Movie';

@Component({
  selector: 'app-liste-resultats-films',
  templateUrl: './liste-resultats-recherche.component.html',
  styleUrls: ['./liste-resultats-recherche.component.css']
})
export class ListeResultatsRechercheComponent implements OnInit {
  currentSearchRes: SearchMovieResponse;
  genresId: number[];
  currentPeopleSearchRes: SearchPeopleResponse;
  constructor(private routeur: Router,
              private route: ActivatedRoute,
              public tmdb: TmdbService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tmdb.searchMovie({
        language: "fr-FR",
        query: params['searchText']
      }).then(
        res => {
          this.genresId = [];
          this.currentSearchRes = res;
          this.currentSearchRes.results.forEach(result => {
            result.genre_ids.forEach(genre => {
              if (!this.genresId.includes(genre)) {
                this.genresId.push(genre);
              }
            });
          });
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
