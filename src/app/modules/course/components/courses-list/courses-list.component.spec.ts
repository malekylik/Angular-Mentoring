import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { Course } from '../../models/course.model';
import { CourseRelevanceDirective } from '../../directives/course-relevance/course-relevance.directive';
import { DurationPipe } from '../../pipes/duration/duration.pipe';
import { CourseOrderByPipe } from '../../pipes/course-order-by/course-order-by.pipe';

const courses: Course[] = [
  {
    id: "1",
    name: "Video Course 1",
    date: "05.29.2018",
    length: 88,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
    isTopRated: false,
    authors: []
  },
  {
    id: "244",
    name: "Video Course 2",
    date: "06.10.2018",
    length: 27,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
    isTopRated: true,
    authors: []
  },
  {
    id: "3",
    name: "Video Course 3",
    date: "07.14.2018",
    length: 70,
    description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
    isTopRated: false,
    authors: []
  },
];

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CoursesListComponent,
        CourseItemComponent, 
        CourseRelevanceDirective, 
        DurationPipe,
        CourseOrderByPipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = courses;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete course item with proper id when delete button is clicked at course item', () => {
    const onDeleteCourse = spyOn(component, 'onDeleteCourse');
    
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.queryAll(By.css('.controls__delete-course-item-control'))[1];
    deleteButton.triggerEventHandler('click', fixture.componentInstance.courses[1].id);

    expect(onDeleteCourse).toHaveBeenCalledWith(fixture.componentInstance.courses[1].id);
  });

  it('should render proper amount of course items', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(component.courses.length);
  });
});
