import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieListService} from "../movie-list.service";

@Component({
  selector: 'app-element-film',
  templateUrl: './element-film.component.html',
  styleUrls: ['./element-film.component.css']
})
export class ElementFilmComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tmdb: TmdbService, private movieList: MovieListService) { }

  ngOnInit() {
  }

}
