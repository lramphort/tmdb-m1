import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeScreenComponent } from './fake-screen.component';

describe('FakeScreenComponent', () => {
  let component: FakeScreenComponent;
  let fixture: ComponentFixture<FakeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
