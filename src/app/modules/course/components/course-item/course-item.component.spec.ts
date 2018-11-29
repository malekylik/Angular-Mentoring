import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../../shared/shared.module';
import { CourseItemComponent } from './course-item.component';
import { Course } from '../../models/course.model';
import { CourseRelevanceDirective } from '../../directives/course-relevance/course-relevance.directive';
import { DurationPipe } from '../../pipes/duration/duration.pipe';

@Component({
  template: `
    <app-course-item (deleteCourse)="onDeleteCourse($event)" [course]="course"></app-course-item>
  `
})
class TestHostComponent {
  course: Course = {
    id: "42",
    name: "Video Course 4",
    date: "07/16/2018",
    length: 46,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
    isTopRated: false
  };

  courseIdToDelete: string;

  onDeleteCourse(id: string): void {
    this.courseIdToDelete = id;
  }
}

describe('CourseItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [CourseItemComponent, TestHostComponent, CourseRelevanceDirective, DurationPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render passed course information', () => {
    const courseTitleElement = fixture.debugElement.query(By.css(".course-title")).nativeElement;
    const courseDurationElement = fixture.debugElement.query(By.css(".course-duration")).nativeElement;
    const creationTimeElement = fixture.debugElement.query(By.css(".info-with-description__creation-time")).nativeElement;
    const descriptionTimeElement = fixture.debugElement.query(By.css(".description")).nativeElement;
    const course = component.course;

    expect(courseTitleElement.innerText).toBe(new UpperCasePipe().transform(course.name));
    expect(courseDurationElement.innerText).toBe(new DurationPipe().transform(course.length));
    expect(creationTimeElement.innerText).toBe('7/16/18');
    expect(descriptionTimeElement.innerText).toBe(course.description);
  });

  it('should trigger delete event on clicked course item', () => {
    const deleteButton = fixture.debugElement.query(By.css(".controls__delete-course-item-control"));
    
    deleteButton.triggerEventHandler('click', null);
    expect(component.courseIdToDelete).toBe(component.course.id);    
  });
});
