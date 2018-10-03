import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListWithControlsComponent } from './courses-list-with-controls.component';

describe('CoursesListWithControlsComponent', () => {
  let component: CoursesListWithControlsComponent;
  let fixture: ComponentFixture<CoursesListWithControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListWithControlsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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

  it('start load more on button click', () => {
    spyOn(component, 'onLoadMore');

    fixture.debugElement.query(By.css('.courses-list-container_load-more-button')).triggerEventHandler('click', null);

    expect(component.onLoadMore).toHaveBeenCalled();
  });
});
