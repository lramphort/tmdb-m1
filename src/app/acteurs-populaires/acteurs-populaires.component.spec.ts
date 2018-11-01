import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeursPopulairesComponent } from './acteurs-populaires.component';

describe('ActeursPopulairesComponent', () => {
  let component: ActeursPopulairesComponent;
  let fixture: ComponentFixture<ActeursPopulairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActeursPopulairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActeursPopulairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
