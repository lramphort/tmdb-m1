import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TmdbService} from "../tmdb.service";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actorId: number;
  birthday: string;
  deathday?: string;
  birthPlace: string;
  poster_path: string;

 constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
    this.actorId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getPerson(this.actorId).then(res => {
      this.birthday = res.birthday;
      this.deathday = res.deathday;
      this.birthPlace = res.place_of_birth;
      this.poster_path = res.profile_path;
    });

   }

  ngOnInit() {
  }

  getPath(): string { return `https://image.tmdb.org/t/p/w500${this.poster_path}`; }


}
