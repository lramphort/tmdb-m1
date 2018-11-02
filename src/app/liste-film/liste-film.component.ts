import {Component, Input, OnInit} from '@angular/core';
import {MovieResult} from '../tmdb-data/searchMovie';
import {MovieResponse} from '../tmdb-data/Movie';

@Component({
  selector: 'app-liste-film',
  templateUrl: './liste-film.component.html',
  styleUrls: ['./liste-film.component.css']
})
export class ListeFilmComponent implements OnInit {

  @Input() movie: MovieResponse;

  constructor() { }

  ngOnInit() {
  }

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
  }

}
