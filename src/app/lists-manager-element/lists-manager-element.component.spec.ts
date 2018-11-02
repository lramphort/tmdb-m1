import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsManagerElementComponent } from './lists-manager-element.component';

describe('ListsManagerElementComponent', () => {
  let component: ListsManagerElementComponent;
  let fixture: ComponentFixture<ListsManagerElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsManagerElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsManagerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
