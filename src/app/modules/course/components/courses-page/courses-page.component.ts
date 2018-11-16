import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbsService } from '../../../core/services/breadcrumbs/breadcrumbs.service';
import { BaseBreadcrumb } from '../../../shared/models/base-breadcrumb';
import { Breadcrumb } from 'src/app/modules/shared/models/breadcrumb.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    ) { }

  ngOnInit() {
    // const courseUrl: string = this.router.url;
    // const courseBreadcrumbLabel: string = 'Courses';
    // console.log('breadcrumbs init');

    // console.log('course-page-init', this.router.url);
    // this.breadcrumbsService.getBreadcrumbs()
    // .subscribe((breadcrumbs: Breadcrumb[]) => {
    //   this.breadcrumbs = breadcrumbs;
    //   console.log(breadcrumbs);
    // });

    // let currentUrl: string = '';
    // this.breadcrumbsService.pushBreadcrumbs(courseUrl.split('/')
    // .map((url, i) => {
    //   currentUrl += `${url}/`;
    //   return new BaseBreadcrumb(currentUrl, );
    // }));
  }

}
