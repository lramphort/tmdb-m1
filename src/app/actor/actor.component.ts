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

 constructor(private route: ActivatedRoute, private tmdb: TmdbService) {
    this.actorId = +this.route.snapshot.paramMap.get('id');
    this.tmdb.getPerson(this.actorId).then(res => {});

   }

  ngOnInit() {
  }

}
