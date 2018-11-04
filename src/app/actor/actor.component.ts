import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";
import {PersonCreditResponse, PersonResponse} from '../tmdb-data/Person';
import {MovieResponse} from '../tmdb-data/Movie';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actor: PersonResponse;
  image: string;
  //credits: PersonCreditResponse;
  movies: MovieResponse[];

 constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
    const actorId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getPerson(actorId).then(res => {
      this.actor = res;
      console.log(this.actor.gender);
      this.image = null;
      //this.credits = null;
      this.movies = [];
      this.tmdb.getPersonCredit(actorId, {language: "fr-FR"}).then(val => {
        //this.credits = val;
        val.cast.forEach(cast => {
          this.tmdb.getMovie(cast.id, {language: "fr-FR"}).then(m => {
            this.movies.push(m);
          });
        });
      });
      this.tmdb.getPersonImages(actorId).then(val => {
        if (val.profiles.length > 0) {
          this.image = val.profiles[0].file_path;
        }
      });
    });

   }

  ngOnInit() {
  }

  getProfilePic(): string {
   if (this.image) {
     return `https://image.tmdb.org/t/p/w500${this.image}`;
   }

   if (this.actor.gender === 1) {
     return "/assets/mockup_woman_profile.jpg";
   } else if (this.actor.gender === 2) {
     return "/assets/mockup_man_profile.jpg";
   }

    return "/assets/mockup_neutral_profile.jpg";

  }

  getPath(s: string): string {
    if (s) {
      return "https://image.tmdb.org/t/p/w92/" + s;
    } else {
      return "/assets/mockup_poster_tiny.jpg";
    }
  }

}
