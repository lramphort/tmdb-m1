import {Component, Inject, Input, OnInit} from '@angular/core';
import {ListStructure} from '../dataTypes/ListStructure';
import {MovieListService} from '../movie-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface DialogData {
  key: string;
}


@Component({
  selector: 'app-lists-manager-element',
  templateUrl: './lists-manager-element.component.html',
  styleUrls: ['./lists-manager-element.component.css']
})
export class ListsManagerElementComponent implements OnInit {

  @Input() list: ListStructure;
  editMode: boolean;
  newName: string;

  constructor(private mls: MovieListService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  delete(): void {
    //this.mls.deleteList(this.list.key);
    const dialogRef = this.dialog.open(DialogDeleteListComponent, {
      width: '300px',
      data: {key: this.list.key}
    });
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


@Component({
  selector: 'app-dialog-delete-list',
  templateUrl: 'dialog-delete-list.html'
})
export class DialogDeleteListComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private mls: MovieListService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  answerNo(): void {
    this.dialogRef.close();
  }

  answerYes(): void {
    console.log(this.data.key);
    this.mls.deleteList(this.data.key);
    // gérer le cas où on supprime la liste en cours d'affichage
    //this.router.navigate(['']);
    this.dialogRef.close();
  }

}
