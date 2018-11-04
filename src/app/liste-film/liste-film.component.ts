import {Component, Inject, Input, OnInit} from '@angular/core';
import {MovieResponse} from '../tmdb-data/Movie';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MovieListService} from '../movie-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ListStructure} from '../dataTypes/ListStructure';

export interface DialogData {
  key: number;
  liste: ListStructure;
}

@Component({
  selector: 'app-liste-film',
  templateUrl: './liste-film.component.html',
  styleUrls: ['./liste-film.component.css']
})
export class ListeFilmComponent implements OnInit {

  @Input() movie: MovieResponse;
  @Input() liste: ListStructure;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  getPath(): string {
      if (this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
      }
      return "/assets/mockup_poster.jpg";
  }

  deleteMovie() {
    const dialogRef = this.dialog.open(DialogDeleteMovieComponent, {
      width: '300px',
      data: {key: this.movie.id, liste: this.liste}
    });
  }

}



@Component({
  selector: 'app-dialog-delete-movie',
  templateUrl: 'dialog-delete-movie.html'
})
export class DialogDeleteMovieComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteMovieComponent>,
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
    this.mls.deleteMovie(this.data.liste, this.data.key);
    this.dialogRef.close();
  }

}
