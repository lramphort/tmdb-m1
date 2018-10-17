import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  movieId: number;
  annee: number;
  genre: string;
  status: string;
  compagnie: string;
  pays: string;
  langue: string;
  revenue: string;
  bugdet: string;
  synopsis: string;
  /*acteurs: string[]*/


  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
    this.movieId = 0;
    annee: number;
    genre: string;
    status: string;
    compagnie: string;
    pays: string;
    langue: string;
    revenue: string;
    bugdet: string;
    synopsis: string;
    this.tmdb.getMovie(this.movieId);
  }

  ngOnInit() {

  }


}
