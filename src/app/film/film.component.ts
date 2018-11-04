import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieCast, MovieGenre, ProductionCompany, ProductionCountry, SpokenLanguage} from "../tmdb-data/Movie";
import {MovieListService} from "../movie-list.service";
import {ListStructure} from "../dataTypes/ListStructure";
import {map} from 'rxjs/operators';

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


  lists: ListStructure[];
  isInAList: boolean;
  isUserLogged: boolean;


  constructor(private route: ActivatedRoute, private tmdb: TmdbService, private movieList: MovieListService) {
    this.isUserLogged = false;
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getMovie(this.movieId, {
      language: "fr-FR"
    }).then(res => {
      this.title = res.title;
      this.annee = res.release_date;
      this.status = res.status;
      this.revenue = res.revenue;
      this.bugdet = res.budget;
      this.synopsis = res.overview;
      this.genre = res.genres;
      this.compagnies = res.production_companies;
      this.pays = res.production_countries;
      this.langues = res.spoken_languages;
      this.poster_path = res.poster_path;
      this.vote_average = res.vote_average;
    });

    this.tmdb.getMovieCredit(this.movieId).then(res => {
      this.cast = res.cast;
    });

    this.movieList.getUser().subscribe(u => {

      this.isUserLogged = false;

      if (u) { // User is logged
        this.isUserLogged = true;
        this.movieList.getUserLists().snapshotChanges().pipe(
          map( changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          })
        ).subscribe(lists => {
          this.lists = lists;
          this.isInAList = false;
          this.lists.forEach(l => this.isInTheList(l));
        });
      }
    });
  }

  ngOnInit() {
  }

  isInTheList(list: ListStructure): boolean {
    if (list.movies && list.movies.filter(m => m === this.movieId).length > 0) {
      this.isInAList = true;
      return true;
    }
    return false;
  }

  getPath(): string {
    if (this.poster_path) {
      return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
    }
    return "/assets/mockup_poster.jpg";
  }

  addToList(list: ListStructure) {
    this.movieList.addMovie(list, this.movieId);
  }
}

