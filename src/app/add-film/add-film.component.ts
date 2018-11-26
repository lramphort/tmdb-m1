import {Component, Input, OnInit} from '@angular/core';
import {ListStructure} from "../dataTypes/ListStructure";
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {MovieListService} from "../movie-list.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {

  @Input() movieId: number;

  lists: ListStructure[];
  isInAList: boolean;
  isUserLogged: boolean;
  newList: string;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService, private movieList: MovieListService) {
    this.isUserLogged = false;
    this.movieList.getUser().subscribe(u => {

      this.isUserLogged = false;

      if (u) { // User is logged
        this.isUserLogged = true;
        this.movieList.getUserLists().snapshotChanges().pipe(
          map( changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          })
        ).subscribe(lists => {
          this.lists = lists;
          this.isInAList = false;
          this.lists.forEach(l => this.isInTheList(l));
        });
      }
    });
  }

  ngOnInit() {
  }

  addToOrRemoveFromList(list: ListStructure) {
    if (this.isInTheList(list)){
      this.movieList.deleteMovie(list, this.movieId);
    } else {
      this.movieList.addMovie(list, this.movieId);
    }
  }

  isInTheList(list: ListStructure): boolean {
    if (list.movies && list.movies.filter(m => m === this.movieId).length > 0) {
      this.isInAList = true;
      return true;
    }
    return false;
  }

  AddToANewList(name: string) {
    const l: ListStructure = new ListStructure();
    l.name = this.newList;
    l.movies = [this.movieId];
    console.log(l);
    this.movieList.createList(l);
    this.newList = "";
  }

}
