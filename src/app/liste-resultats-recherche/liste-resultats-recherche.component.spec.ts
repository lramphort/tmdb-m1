import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResultatsRechercheComponent } from './liste-resultats-recherche.component';

describe('ListeResultatsRechercheComponent', () => {
  let component: ListeResultatsRechercheComponent;
  let fixture: ComponentFixture<ListeResultatsRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeResultatsRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeResultatsRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
