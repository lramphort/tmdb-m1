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
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatDialogModule, MatInputModule} from '@angular/material';
import { FilmComponent } from './film/film.component';
import { ListeFilmsComponent } from './liste-films/liste-films.component';
import { RechercheComponent } from './recherche/recherche.component';
import {CreationCompteComponent, CreationCompteDialogComponent} from './creation-compte/creation-compte.component';
import { ConnexionComponent } from './connexion/connexion.component';



const appRoutes: Routes = [
  {path: 'search', component: ListeFilmsComponent},
  {path: 'creation-compte', component: CreationCompteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    ListeFilmsComponent,
    RechercheComponent,
    CreationCompteComponent,
    CreationCompteDialogComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  exports: [
    MatFormFieldModule
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent],
  entryComponents: [CreationCompteDialogComponent]
})
export class AppModule { }
