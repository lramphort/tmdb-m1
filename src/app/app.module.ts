import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {TmdbService} from './tmdb.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { FilmComponent } from './film/film.component';
import { ListeResultatsFilmsComponent } from './liste-resultats-films/liste-resultats-films.component';
import { RechercheComponent } from './recherche/recherche.component';
import {CreationCompteComponent, CreationCompteDialogComponent} from './creation-compte/creation-compte.component';
import { ConnexionComponent, ConnexionDialogComponent } from './connexion/connexion.component';

import { ListsManagerComponent } from './lists-manager/lists-manager.component';
import { ListeComponent } from './liste/liste.component';
import { ActorComponent } from './actor/actor.component';
import {AuthService} from './auth.service';
import { FilmsSuggeresComponent } from './films-suggeres/films-suggeres.component';
import { ActeursPopulairesComponent } from './acteurs-populaires/acteurs-populaires.component';

import { MovieListService } from './movie-list.service';
import { ListsManagerElementComponent } from './lists-manager-element/lists-manager-element.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'search', component: ListeResultatsFilmsComponent},
  {path: 'creation-compte', component: CreationCompteComponent},
  {path: 'movie/:id', component: FilmComponent},
  {path: 'list', component: ListeComponent},
  {path: 'actor/:id', component: ActorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    ListeResultatsFilmsComponent,
    RechercheComponent,
    ListsManagerComponent,
    ActorComponent,
    RechercheComponent,
    CreationCompteComponent,
    CreationCompteDialogComponent,
    ConnexionComponent,
    ConnexionDialogComponent,
    ListeComponent,
    FilmsSuggeresComponent,
    ActeursPopulairesComponent,
    ListsManagerElementComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [TmdbService, AuthService, MovieListService],
  bootstrap: [AppComponent],
  entryComponents: [CreationCompteDialogComponent, ConnexionDialogComponent]
})
export class AppModule { }
