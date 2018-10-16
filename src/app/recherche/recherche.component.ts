import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';

import {Router} from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  @Input() valeurRecherchee: string;
  listeFilmsRecherches: SearchMovieResponse;
  constructor(private tmdb: TmdbService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    this.router.navigate(['search'], {queryParams: {searchText: this.valeurRecherchee}} );

  }
}
