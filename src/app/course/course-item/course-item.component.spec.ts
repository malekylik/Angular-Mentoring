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

  it('should trigger delete event on clicked course item', () => {
    const deleteButton = fixture.debugElement.query(By.css(".courses-list-container_delete-courses-itme-control"));
    
    deleteButton.triggerEventHandler('click', null);
  });


});
