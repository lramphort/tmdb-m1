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
  selectedCateg: string;
  genreList: MovieGenresResponse;

  constructor(private tmdb: TmdbService, private route: ActivatedRoute, private router: Router) {

    this.setGenreList();

    this.route.queryParams.subscribe(params => {
      this.valeurRecherchee = params['searchText'];
    });

  }

  get gGenreList() {
    return this.genreList;
  }

  async setGenreList(){
    const genres = await this.tmdb.getMovieGenres();
    console.log(genres);
    this.genreList = genres;
  }

  ngOnInit() {
    this.selectedCateg = 'Tous genres';

  }

  onSubmit() {
    if (this.selectedCateg === 'Tous genres') {
      this.router.navigate(['search'], {queryParams: {searchText: this.valeurRecherchee}});
    } else {
      this.router.navigate(['search'], {queryParams: {searchText: this.valeurRecherchee, category: this.selectedCateg}});
    }

  }
}
