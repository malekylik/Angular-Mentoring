import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListWithControlsComponent } from './courses-list-with-controls.component';

describe('CoursesListWithControlsComponent', () => {
  let component: CoursesListWithControlsComponent;
  let fixture: ComponentFixture<CoursesListWithControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListWithControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListWithControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
