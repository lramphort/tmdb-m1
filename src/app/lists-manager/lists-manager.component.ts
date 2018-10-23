import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';

@Component({
  selector: 'app-lists-manager',
  templateUrl: './lists-manager.component.html',
  styleUrls: ['./lists-manager.component.css']
})
export class ListsManagerComponent implements OnInit {
  addingList: boolean;
  newListe: string;

  constructor(private route: Router, private list: MovieListService) {
    this.addingList = false;
  }

  ngOnInit() {
  }

  createList() {
    this.list.addList(this.newListe);
  }
}
