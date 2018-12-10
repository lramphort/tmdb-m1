import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fake-screen',
  templateUrl: './fake-screen.component.html',
  styleUrls: ['./fake-screen.component.css']
})
export class FakeScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.open('./fake-screen.component.html', '_blank');
  }

}
