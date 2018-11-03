import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../tmdb.service';
import {MovieResponse} from '../tmdb-data/Movie';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-films-suggeres',
  templateUrl: './films-suggeres.component.html',
  styleUrls: ['./films-suggeres.component.css']
})
export class FilmsSuggeresComponent implements OnInit {


  latestId: number;
  movieList: MovieResponse[];

  constructor(private routeur: Router,
              private route: ActivatedRoute,
              private tmdb: TmdbService) { }


  ngOnInit() {

    this.tmdb.getLatestMovie().then(res =>  {
      this.latestId = res.id;
      this.movieList = this.get10RandomMovies();
    });


  }


  get10RandomMovies(): MovieResponse[] {

    const listResult: MovieResponse[] = [];
    const listId: number[] = [];
    let rand: number;
    for (let i = 0; i < 10; i++) {
      while (listId.includes(rand = Math.floor(Math.random() * this.latestId) + 1) ) {}
      listId.push(rand);
    }

    for (const j in listId) {
      this.tmdb.getMovie(listId[j]).then( res => {
        if (!res.adult) {
          listResult.push(res);
        }
      })
        .catch(any => {});

    }
    return listResult;

  }

  getPath(s: string): string { return "https://image.tmdb.org/t/p/w500" + s; }

}
