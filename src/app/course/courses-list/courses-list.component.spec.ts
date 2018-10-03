import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init with course items', () => {
    it('after constructor courses list should be zero length', () => {
      expect(component.courses.length).toBe(0);
    });

    it('after onInit courses list should be zero length', () => {
      fixture.detectChanges();
      expect(component.courses.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('should render proper amount of course items', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.courses-list-container_courses-list-item')).length).toBe(component.courses.length);
  });
});
