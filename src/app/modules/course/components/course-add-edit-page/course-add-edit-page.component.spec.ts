import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddEditPageComponent } from './course-add-edit-page.component';

describe('CourseAddEditPageComponent', () => {
  let component: CourseAddEditPageComponent;
  let fixture: ComponentFixture<CourseAddEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
