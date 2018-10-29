import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResultatsFilmsComponent } from './liste-resultats-films.component';

describe('ListeResultatsFilmsComponent', () => {
  let component: ListeResultatsFilmsComponent;
  let fixture: ComponentFixture<ListeResultatsFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeResultatsFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeResultatsFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
