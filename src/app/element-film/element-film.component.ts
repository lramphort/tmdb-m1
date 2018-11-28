import {Component, Input, OnInit} from '@angular/core';
import {MovieResponse} from "../tmdb-data/Movie";

@Component({
  selector: 'app-element-film',
  templateUrl: './element-film.component.html',
  styleUrls: ['./element-film.component.css']
})
export class ElementFilmComponent implements OnInit {
  @Input() movies: MovieResponse[];

  constructor() {
  }

  ngOnInit() {
  }

  getPath(s: string): string {
    if (s) {
      return "https://image.tmdb.org/t/p/w92/" + s;
    } else {
      return "/assets/mockup_poster_tiny.jpg";
    }
  }

}
