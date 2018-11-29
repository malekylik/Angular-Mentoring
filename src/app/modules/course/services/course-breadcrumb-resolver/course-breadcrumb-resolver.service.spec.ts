import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CourseBreadcrumbResolverService } from './course-breadcrumb-resolver.service';
import { CoursesService } from '../courses.service';

describe('CourseBreadcrumbResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CoursesService, CourseBreadcrumbResolverService],
  }));

  it('should be created', () => {
    const service: CourseBreadcrumbResolverService = TestBed.get(CourseBreadcrumbResolverService);
    expect(service).toBeTruthy();
  });
});
