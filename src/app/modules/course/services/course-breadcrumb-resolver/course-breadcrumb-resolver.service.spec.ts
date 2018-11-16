import { TestBed } from '@angular/core/testing';

import { CourseBreadcrumbResolverService } from './course-breadcrumb-resolver.service';

describe('CourseBreadcrumbResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseBreadcrumbResolverService = TestBed.get(CourseBreadcrumbResolverService);
    expect(service).toBeTruthy();
  });
});
