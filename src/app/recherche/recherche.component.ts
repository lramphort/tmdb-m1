import {Component, Input, OnInit} from '@angular/core';
import {TmdbService} from '../tmdb.service';
import {SearchMovieResponse} from '../tmdb-data/searchMovie';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  @Input() valeurRecherchee: string;
  listeFilmsRecherches: SearchMovieResponse;
  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.tmdb.searchMovie({
      language: "fr-FR",
      query: this.valeurRecherchee
    }).then(
      res => {
        this.listeFilmsRecherches = res;
      }
    );
  }
}
