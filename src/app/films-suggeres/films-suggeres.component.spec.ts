import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsSuggeresComponent } from './films-suggeres.component';

describe('FilmsSuggeresComponent', () => {
  let component: FilmsSuggeresComponent;
  let fixture: ComponentFixture<FilmsSuggeresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsSuggeresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsSuggeresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
