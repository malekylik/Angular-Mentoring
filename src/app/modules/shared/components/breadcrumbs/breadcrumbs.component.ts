import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  breadcrumbs: Breadcrumb[] = [];
  
  private subscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subsribeRouteEvent();
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subsribeRouteEvent(): void {
    this.subscription = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        distinctUntilChanged(),
        map(e => this.buildBreadCrumb(this.activatedRoute.root)),
      )
      .subscribe((breadcrumbs: Breadcrumb[]) => {
        this.breadcrumbs = breadcrumbs;
      });
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = ''): Breadcrumb[] {
    let label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
    let path = route.routeConfig ? route.routeConfig.path : '';

    if (path === '') {
      return route.firstChild ? this.buildBreadCrumb(route.firstChild, '/') : [];
    }

    if (this.isDynamicRoute(path)) {
      path = this.getValueFromDynamicRoute(route);
      label = this.resolveLabel(route.snapshot.data, label);
    }

    const nextUrl: string = `${url}${path}/`;
    const breadcrumb: Breadcrumb = {
      url: nextUrl,
      label,
    };

    if (route.firstChild) {
        return [breadcrumb, ...this.buildBreadCrumb(route.firstChild, nextUrl)];
    }

    return [breadcrumb];
  }

  private isDynamicRoute(path: string): boolean {
    return /^:/.test(path);
  }

  private getValueFromDynamicRoute(route: ActivatedRoute): string {
    return route.url['value'] ? route.url['value'][0].path : '';
  }

  private resolveLabel(data: Data, dataPath: string): string {
    const paths: string[] = dataPath.split('.');
    const valueFiledIndex: number = 0;
    const fieldsStartIndex: number = 1;
    
    let value: any = data[paths[valueFiledIndex]] || '';

    for (let i = fieldsStartIndex; i < paths.length; i++) {
      if (!value[paths[i]]) {
        return '';
      }

      value = value[paths[i]];
    }
    
    return value;
  } 

}
