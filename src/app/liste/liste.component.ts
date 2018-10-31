import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';

@Component({
  selector: 'app-liste-component',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  currentList: ListStructure;

  constructor(private route: ActivatedRoute, private mls: MovieListService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['name']);
      this.mls.getUser().subscribe(user => {
        if (user) {
          this.mls.getUserLists().subscribe(lists => {
            this.currentList = lists.filter(l => l.name === params['name'])[0];
          });
        }
      });


    });



      /*this.tmdb.searchMovie({
        language: "fr-FR",
        query: params['searchText']
      }).then(
        res => {

          this.currentSearchRes = res;
        }
      );

    });*/
  }

}
