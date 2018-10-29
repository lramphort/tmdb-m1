import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {TmdbService} from './tmdb.service';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatSidenavModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FilmComponent } from './film/film.component';
import { ListeResultatsFilmsComponent } from './liste-resultats-films/liste-resultats-films.component';
import { RechercheComponent } from './recherche/recherche.component';
import { ListsManagerComponent } from './lists-manager/lists-manager.component';
import { ActorComponent } from './actor/actor.component';



const appRoutes: Routes = [
  {path: 'search', component: ListeResultatsFilmsComponent},
  {path: 'movie/:id', component: FilmComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    ListeResultatsFilmsComponent,
    RechercheComponent,
    ListsManagerComponent,
    ActorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
