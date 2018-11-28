import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieResponse} from "../tmdb-data/Movie";

@Component({
  selector: 'app-element-film',
  templateUrl: './element-film.component.html',
  styleUrls: ['./element-film.component.css']
})
export class ElementFilmComponent implements OnInit {
  @Input() movieId: number;

  movie: MovieResponse;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
    this.tmdb.getMovie(this.movieId, {
      language: "fr-FR"
    }).then(res => {
      this.movie = res;
      console.log("movie.id = ",this.movie.id);
      console.log("movieId = ",this.movieId);
    });
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
