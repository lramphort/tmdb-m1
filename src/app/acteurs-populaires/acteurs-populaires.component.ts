import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TmdbService} from '../tmdb.service';
//import {PersonResponse} from '../tmdb-data/Person';

@Component({
  selector: 'app-acteurs-populaires',
  templateUrl: './acteurs-populaires.component.html',
  styleUrls: ['./acteurs-populaires.component.css']
})
export class ActeursPopulairesComponent implements OnInit {

  personList: any;

  constructor(private routeur: Router,
              private route: ActivatedRoute,
              private tmdb: TmdbService) { }


  ngOnInit() {

    this.tmdb.getPopularPersons().then( res => {
      this.personList = res;
    });

  }



}
