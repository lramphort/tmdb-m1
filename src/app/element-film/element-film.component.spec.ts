import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementFilmComponent } from './element-film.component';

describe('ElementActeurComponent', () => {
  let component: ElementFilmComponent;
  let fixture: ComponentFixture<ElementFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
