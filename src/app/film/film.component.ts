import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieGenre, ProductionCompany, ProductionCountry, SpokenLanguage} from "../tmdb-data/Movie";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  movieId: number;
  title: string;
  annee: string;
  genre: MovieGenre[];
  status: string;
  compagnies: ProductionCompany[];
  pays: ProductionCountry[];
  langues: SpokenLanguage[];
  revenue: number;
  bugdet: number;
  synopsis: string;
  poster_path: string;
  // acteurs: ;


  constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
    this.movieId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getMovie(this.movieId).then(res => {
      this.title = res.title;
      this.annee = res.release_date;
      this.status     = res.status;
      this.revenue    = res.revenue;
      this.bugdet     = res.budget;
      this.synopsis   = res.overview;
      this.genre      = res.genres;
      this.compagnies  = res.production_companies;
      this.pays       = res.production_countries;
      this.langues    = res.spoken_languages;
      this.poster_path = res.poster_path;
      // this.acteurs  = res. ?????? ;
    });
  }

  ngOnInit() {

  }

 /* plus(liste de film l) {
        ajoute le film a la liste passee en param
  }*/

  getPath(path: string): string {
    return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
  }

}
