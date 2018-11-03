import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieCast, MovieGenre, ProductionCompany, ProductionCountry, SpokenLanguage} from "../tmdb-data/Movie";
import {MovieListService} from "../movie-list.service";
import {ListStructure} from "../dataTypes/ListStructure";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  movieId: number;
  title: string;
  annee: string;
  genre: MovieGenre[];
  status: string;
  compagnies: ProductionCompany[];
  pays: ProductionCountry[];
  langues: SpokenLanguage[];
  revenue: number;
  bugdet: number;
  synopsis: string;
  poster_path: string;
  vote_average: number;
  cast: MovieCast[];


  constructor(private route: ActivatedRoute, private tmdb: TmdbService, private movieList: MovieListService) {
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getMovie(this.movieId).then(res => {
      this.title = res.title;
      this.annee = res.release_date;
      this.status     = res.status;
      this.revenue    = res.revenue;
      this.bugdet     = res.budget;
      this.synopsis   = res.overview;
      this.genre      = res.genres;
      this.compagnies  = res.production_companies;
      this.pays       = res.production_countries;
      this.langues    = res.spoken_languages;
      this.poster_path = res.poster_path;
      this.vote_average = res.vote_average;
    });
    this.tmdb.getMovieCredit(this.movieId).then(res => {
      this.cast = res.cast;
    });
  }

  ngOnInit() {

  }

  getListsWhereMovieBelong(movieId: number): string[] {
    const tab: string[] = [];
    this.movieList.getUser().subscribe( u => {
      if (u) {
        this.movieList.getUserLists().valueChanges().subscribe(lists => {
          lists.forEach(list => {
            if (this.isInTheList(movieId, list)) { tab.push(list.name.toString()); }
          });
        });
      }
    });
    return tab;
  }

  isInAList(movieId: number): boolean {
    if ([] === this.getListsWhereMovieBelong(movieId)) { return false; }
  }

  isInTheList(movieId: number, list: ListStructure): boolean {
    return list.movies.reduce( (acc, v) => (acc || v === movieId), false);
  }

  getPath(): string { return `https://image.tmdb.org/t/p/w500${this.poster_path}`; }

}
