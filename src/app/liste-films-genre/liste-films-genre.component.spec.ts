import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFilmsGenreComponent } from './liste-films-genre.component';

describe('ListeFilmsGenreComponent', () => {
  let component: ListeFilmsGenreComponent;
  let fixture: ComponentFixture<ListeFilmsGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFilmsGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFilmsGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
