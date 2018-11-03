import {Component, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';

import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  valeurRecherchee: string;
  listeFilmsRecherches: SearchMovieResponse;
  constructor(private tmdb: TmdbService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      this.valeurRecherchee = params['searchText'];
    });

  }

  ngOnInit() {
  }

  onSubmit() {

    this.router.navigate(['search'], {queryParams: {searchText: this.valeurRecherchee}} );

  }
}
