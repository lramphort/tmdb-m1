import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-liste-films',
  templateUrl: './liste-films.component.html',
  styleUrls: ['./liste-films.component.css']
})
export class ListeFilmsComponent implements OnInit {
  currentSearchRes: SearchMovieResponse;
  constructor(private route: ActivatedRoute, private tmdb: TmdbService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tmdb.searchMovie({
        language: "fr-FR",
        query: params['searchText']
      }).then(
        res => {

          console.log("Essai");
          this.currentSearchRes = res;
        }
      );

    });
  }

}
