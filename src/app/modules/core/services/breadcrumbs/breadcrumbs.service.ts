import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Breadcrumb } from '../../../shared/models/breadcrumb.model';

@Injectable()
export class BreadcrumbsService {

  private breadcrumbs: Breadcrumb[] = [];
  private breadcrumbs$: Subject<Breadcrumb[]> = new Subject();

  constructor() { }

  getBreadcrumbs(): Observable<Breadcrumb[]> {
    return this.breadcrumbs$.asObservable();
  }

  pushBreadcrumbs(breadcrumb: Breadcrumb[]): void {
    this.breadcrumbs.push(...breadcrumb);
    this.breadcrumbs$.next(this.breadcrumbs);
  }
}
