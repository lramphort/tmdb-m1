import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../tmdb.service';
import {MovieResult, SearchMovieResponse} from '../tmdb-data/searchMovie';
import {SearchPeopleResponse} from '../tmdb-data/SearchPeople';
import {MovieGenre} from '../tmdb-data/Movie';


export interface FilterElement {
  genreId: number;
  selected: boolean;
}

@Component({
  selector: 'app-liste-resultats-films',
  templateUrl: './liste-resultats-recherche.component.html',
  styleUrls: ['./liste-resultats-recherche.component.css']
})
export class ListeResultatsRechercheComponent implements OnInit {
  currentSearchRes: SearchMovieResponse;
  genresId: FilterElement[];
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
              if (this.genresId.reduce( (acc, g) => {
                if (genre === g.genreId) {
                  return false;
                } else {
                  return acc;
                }

              }, true)) {
                this.genresId.push({genreId: genre, selected: true});
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


  filterResults(searchResponse: SearchMovieResponse): MovieResult[] {

    const res: MovieResult[] = searchResponse.results.filter((mr) => {

      return mr.genre_ids
        .reduce ( (acc, gid) => {
          return this.getStateOfFilter(gid) ? true : acc;
        }, false);

    })

    return res;
  }


  getStateOfFilter(gID: number): boolean {
    return this.genresId
      .find( (g) => {
      return g.genreId === gID;
    }).selected;
  }


}
