import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse } from '../tmdb-data/searchMovie';
import { SearchPeopleResponse } from '../tmdb-data/SearchPeople';
import { MovieGenre } from '../tmdb-data/Movie';
import { ListStructure } from '../dataTypes/ListStructure';
import { MovieListService } from '../movie-list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-liste-resultats-films',
  templateUrl: './liste-resultats-recherche.component.html',
  styleUrls: ['./liste-resultats-recherche.component.css']
})
export class ListeResultatsRechercheComponent implements OnInit {
  currentSearchRes: SearchMovieResponse;
  genresId: number[];
  currentPeopleSearchRes: SearchPeopleResponse;
  newListe: string;
  lists: ListStructure[];
  isInAList: boolean;

  constructor(private routeur: Router,
    private route: ActivatedRoute,
    private tmdb: TmdbService,
    private movieList: MovieListService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tmdb.searchMovie({
        language: "fr-FR",
        query: params['searchText']
      }, params['category']).then(
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

      this.movieList.getUser().subscribe(u => {
        if (u) { // User is logged
          this.movieList.getUserLists().snapshotChanges().pipe(
            map(changes => {
              return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            })
          ).subscribe(lists => {
            this.lists = lists;
            this.isInAList = false;
          });
        }
      });

    });
  }

  addToList(mId: number, list: ListStructure) {
    if (this.isInTheList(mId, list)) {
      this.movieList.deleteMovie(list, mId);
    } else {
      this.movieList.addMovie(list, mId);
    }
  }

  isInTheList(mId: number, list: ListStructure): boolean {
    if (list.movies && list.movies.filter(m => m === mId).length > 0) {
      this.isInAList = true;
      return true;
    }
    return false;
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  createList() {
    const l: ListStructure = new ListStructure();
    l.name = this.newListe;
    this.movieList.createList(l);
    this.newListe = "";
  }

}
