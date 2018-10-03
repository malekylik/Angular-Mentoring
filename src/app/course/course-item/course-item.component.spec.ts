import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { CourseItemComponent } from './course-item.component';
import { Course } from '../course.model';

@Component({
  template: `
    <app-course-item (deleteCourse)="onDeleteCourse($event)" [course]="course"></app-course-item>
  `
})
class TestHostComponent {
  course: Course = {
    id: "42",
    title: "Video Course 4",
    creationTime: "07.16.2018",
    duration: 46,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"'
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
      declarations: [CourseItemComponent, TestHostComponent]
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

  it('should return formatted time dutaion', () => {
    const courseItemComponent: CourseItemComponent = new CourseItemComponent();

    courseItemComponent.course = { duration: 0 } as Course;
    expect(courseItemComponent.courseDuration).toBe('0min');

    courseItemComponent.course = { duration: 46 } as Course;
    expect(courseItemComponent.courseDuration).toBe('46min');

    courseItemComponent.course = { duration: 60 } as Course;
    expect(courseItemComponent.courseDuration).toBe('1h 0min');

    courseItemComponent.course = { duration: 86 } as Course;
    expect(courseItemComponent.courseDuration).toBe('1h 26min');
  });

  it('should render passed course information', () => {
    const courseTitleElement = fixture.debugElement.query(By.css(".courses-list-container_course-title")).nativeElement;
    const courseDurationElement = fixture.debugElement.query(By.css(".courses-list-container_course-duration")).nativeElement;
    const creationTimeElement = fixture.debugElement.query(By.css(".courses-list-container_course-creation-time-info")).nativeElement;
    const descriptionTimeElement = fixture.debugElement.query(By.css(".courses-list-container_course-description")).nativeElement;
    const course = component.course;

    expect(courseTitleElement.innerText).toBe(course.title);
    expect(courseDurationElement.innerText).toBe('46min');
    expect(creationTimeElement.innerText).toBe(course.creationTime);
    expect(descriptionTimeElement.innerText).toBe(course.description);
  });

  it('should trigger delete event on clicked course item', () => {
    const deleteButton = fixture.debugElement.query(By.css(".courses-list-container_delete-course-itme-control"));
    
    deleteButton.triggerEventHandler('click', null);
    expect(component.courseIdToDelete).toBe(component.course.id);    
  });
});
