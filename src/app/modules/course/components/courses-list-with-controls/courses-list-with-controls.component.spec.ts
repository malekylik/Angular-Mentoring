import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { CoursesListWithControlsComponent } from './courses-list-with-controls.component';
import { CoursesService } from '../../services/courses/courses.service';

describe('CoursesListWithControlsComponent', () => {
  let component: CoursesListWithControlsComponent;
  let fixture: ComponentFixture<CoursesListWithControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: [ CoursesService ],
      declarations: [ CoursesListWithControlsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoursesListWithControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('start load more on button click', () => {
    spyOn(component, 'onLoadMore');

    fixture.debugElement.query(By.css('.load-more-button')).triggerEventHandler('click', null);

    expect(component.onLoadMore).toHaveBeenCalled();
  });
});
