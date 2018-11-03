import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieCast, MovieGenre, ProductionCompany, ProductionCountry, SpokenLanguage} from "../tmdb-data/Movie";
import {MovieListService} from "../movie-list.service";
import {ListStructure} from "../dataTypes/ListStructure";
import {MatDialog} from "@angular/material";
import {MatMenu} from "@angular/material";
import {MatMenuTrigger} from "@angular/material";

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


  constructor(private route: ActivatedRoute, private tmdb: TmdbService, private movieList: MovieListService, public dialog: MatDialog) {
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getMovie(this.movieId).then(res => {
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
      if (u) { // User is logged
        this.movieList.getUserLists().valueChanges().subscribe(lists => {
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
    return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
  }
}

