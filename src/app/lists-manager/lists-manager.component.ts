import {Component, Inject, OnInit,ElementRef,ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MovieListService} from '../movie-list.service';
import {ListStructure} from '../dataTypes/ListStructure';
import {map} from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';





@Component({
  selector: 'app-lists-manager',
  templateUrl: './lists-manager.component.html',
  styleUrls: ['./lists-manager.component.css']
})
export class ListsManagerComponent implements OnInit {
  addingList: boolean;
  newListe: string;
  userLists: any;

  constructor(private router: Router, public listService: MovieListService) {
    this.listService.getUser().subscribe( u => {
      if (u) {
        this.listService.getUserLists().snapshotChanges().pipe(
          map( changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          })
        ).subscribe(lists => {
          this.userLists = lists;
        });
      } else {
        this.userLists = null;
      }
    });

  }

  ngOnInit() {
  }

  createList() {
    const l: ListStructure = new ListStructure();
    l.name = this.newListe;
    l.maj = new Date();
    this.listService.createList(l);
    this.addingList = false;
    this.newListe = "";
  }


}



