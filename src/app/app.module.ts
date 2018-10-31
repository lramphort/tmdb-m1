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
import {
  MatButtonModule,
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
import {ConnexionComponent, ConnexionDialogComponent} from './connexion/connexion.component';

import { ListsManagerComponent } from './lists-manager/lists-manager.component';
import {AuthService} from './auth.service';



const appRoutes: Routes = [
  /*{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},*/
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
    RechercheComponent,
    CreationCompteComponent,
    CreationCompteDialogComponent,
    ConnexionComponent,
    ConnexionDialogComponent
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
  providers: [TmdbService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [CreationCompteDialogComponent, ConnexionDialogComponent]
})
export class AppModule { }
