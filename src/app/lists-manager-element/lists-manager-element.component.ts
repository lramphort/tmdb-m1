import {Component, Input, OnInit} from '@angular/core';
import {ListStructure} from '../dataTypes/ListStructure';
import {MovieListService} from '../movie-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lists-manager-element',
  templateUrl: './lists-manager-element.component.html',
  styleUrls: ['./lists-manager-element.component.css']
})
export class ListsManagerElementComponent implements OnInit {

  @Input() list: ListStructure;
  editMode: boolean;
  newName: string;

  constructor(private mls: MovieListService, private router: Router) { }

  ngOnInit() {
  }

  delete(): void {
    this.mls.deleteList(this.list.key);
  }

  clickOnListe(): void {
    this.router.navigate(['list'], {queryParams: {
      key: this.list.key
    }});
  }

  changeName(): void {
    this.mls.updateList(this.list.key, {name: this.newName});
  }

}
