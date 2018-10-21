import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MovieListService} from '../movie-list.service';

@Component({
  selector: 'app-lists-manager',
  templateUrl: './lists-manager.component.html',
  styleUrls: ['./lists-manager.component.css']
})
export class ListsManagerComponent implements OnInit {

  constructor(private route: Router, private list: MovieListService) { }

  ngOnInit() {
  }

}
