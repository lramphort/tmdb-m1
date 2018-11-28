import {Component, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';

import {ActivatedRoute, Router} from '@angular/router';
import {MovieGenre, MovieGenresResponse} from "../tmdb-data/Movie";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  valeurRecherchee: string;
  genreList: MovieGenresResponse;

  constructor(private tmdb: TmdbService, private route: ActivatedRoute, private router: Router) {

    this.setGenreList();

    this.route.queryParams.subscribe(params => {
      this.valeurRecherchee = params['searchText'];
    });

  }

  async setGenreList(){
    const genres = await this.tmdb.getMovieGenres();
    this.genreList = genres;
  }

  ngOnInit() {

  }

  onSubmit() {

    this.router.navigate(['search'], {queryParams: {searchText: this.valeurRecherchee}});

  }
}
