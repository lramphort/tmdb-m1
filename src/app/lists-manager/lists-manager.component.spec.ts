import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsManagerComponent } from './lists-manager.component';

describe('ListsManagerComponent', () => {
  let component: ListsManagerComponent;
  let fixture: ComponentFixture<ListsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
