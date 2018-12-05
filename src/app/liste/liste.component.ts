import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListService } from '../movie-list.service';
import { ListStructure } from '../dataTypes/ListStructure';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { DialogDeleteListComponent } from '../lists-manager-element/lists-manager-element.component';
import { MatDialog } from '@angular/material';
import { MovieResponse } from '../tmdb-data/Movie';
import { TmdbService } from '../tmdb.service';


@Component({
  selector: 'app-liste-component',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  @ViewChild('sharingInput') elementRef: ElementRef;

  currentList: ListStructure;
  editMode: boolean;
  newName: string;
  moyenne: number;
  isSharingInputDisplayed: boolean;

  listeFilmsTMDB: MovieResponse[];

  constructor(private route: ActivatedRoute,
    private mls: MovieListService,
    public anAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    public dialog: MatDialog,
    private tmdb: TmdbService) { }

  ngOnInit() {
    this.isSharingInputDisplayed = false;

    this.route.queryParams.subscribe(params => {

      this.mls.getUser().subscribe(u => {
        if (u) {
          this.mls.getList(params['key']).snapshotChanges().pipe(
            map(changes => {
              return ({ key: params['key'], ...changes.payload.val() });
            })
          ).subscribe(l => {
            this.currentList = l;
            this.moyenne = 0;
            this.listeFilmsTMDB = [];
            if (l.movies) {
              l.movies.forEach(movie => {
                this.tmdb.getMovie(movie, { language: "FR-fr" }).then(m => {
                  this.listeFilmsTMDB.push(m);

                  const sommePopularity = this.listeFilmsTMDB.reduce((acc, obj) => {
                    return acc + obj.vote_average;
                  }, 0);

                  this.moyenne = sommePopularity / this.listeFilmsTMDB.length;
                });
              }
              );
            }
          });
        }
      });

    });


  }

  delete() {
    this.dialog.open(DialogDeleteListComponent, {
      width: '300px',
      data: { key: this.currentList.key }
    });
  }

  addFilmsTempo() {

    this.mls.addMovie(this.currentList, 105);
    this.mls.addMovie(this.currentList, 165);
    this.mls.addMovie(this.currentList, 196);

    //this.removeFilmTempo();
  }

  removeFilmTempo() {
    this.mls.deleteMovie(this.currentList, 196);
  }

  changeName() {
    this.mls.updateList(this.currentList.key, { name: this.currentList.name });
    this.editMode = false;
  }

  displaySharingInput() {
    this.isSharingInputDisplayed = !this.isSharingInputDisplayed;
  }

  share() {
    this.isSharingInputDisplayed = !this.isSharingInputDisplayed;
    // tslint:disable-next-line:max-line-length
    if (confirm("Liste partagee ! Consultez l'URL suivante : src/assets/fake_screen_share_list.png " +
      ", retrouvez ce message dans la console." + " Confirmez pour etre redirige vers l'ecran.")) {
      window.open('src/assets/fake_screen_share_list.png', 'fake screen');
    }
    console.log("Liste partagee ! Consultez l'URL suivante : src/assets/fake_screen_share_list.png");
  }

}
