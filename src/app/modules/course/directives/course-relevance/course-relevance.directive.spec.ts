import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseRelevanceDirective } from './course-relevance.directive';
import { Course } from '../../models/course.model';

const nowDate: Date = new Date();

@Component({
    template: `
        <article [appCourseRelevance]="freshCourse.date" >some text</article>
        <article [appCourseRelevance]="featureCourse.date" >some text</article>
        <article [appCourseRelevance]="oldCourse.date" >some text</article>
    `
})
class TestHostComponent {
    freshCourse: Course = {
        id: "1",
        name: "Video Course 1",
        date: `${nowDate.getMonth() + 1}.${nowDate.getDate() - 1}.${nowDate.getFullYear()}`,
        length: 88,
        description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
        isTopRated: false,
        authors: [],
    }

    featureCourse: Course = {
        id: "3",
        name: "Video Course 3",
        date: "07.14.2019",
        length: 70,
        description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
        isTopRated: true,
        authors: [],
    }

    oldCourse: Course = {
        id: "2",
        name: "Video Course 2",
        date: "06.10.2018",
        length: 27,
        description: 'Sleeper pelican gulper slimy sculpin demoiselle duckbill, "Sacramento splittail mudminnow dwarf gourami Australian lungfish Atlantic trout mrigal." Nurseryfish: mullet jellynose fish: bonytail chub spiny-back zebrafish crevice kelpfish dartfish; Atlantic silverside. Rice eel four-eyed fish roach, "roanoke bass." Manta Ray halfmoon Shingle Fish: northern squawfish jack nase barfish combfish bowfin stoneroller minnow. Kelp perch haddock oarfish weever, prickleback pencilfish yellowtail barracuda. Carpetshark butterflyfish; monkeyface prickleback orangestriped triggerfish elasmobranch giant danio ocean sunfish, longnose dace oarfish?"',
        isTopRated: true,
        authors: [],
    }
}

describe('CourseRelevanceDirective', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let des: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseRelevanceDirective, TestHostComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        des = fixture.debugElement.queryAll(By.directive(CourseRelevanceDirective));
    });

    it('should make 1st course border green if creationDate < currentDate && creationDate >= currentDate - 14days', () => {
        const bgColor = des[0].nativeElement.style.borderColor;

        expect(bgColor).toBe('green');
    });

    it('should make 2st course border blue if creationDate > currentDate', () => {
        const bgColor = des[1].nativeElement.style.borderColor;

        expect(bgColor).toBe('blue');
    });

    it('shouldn\'t 3st course border if otherwise', () => {
        const bgColor = des[2].nativeElement.style.borderColor;

        expect(bgColor).toBe('');
    });
});
