import { TestBed } from '@angular/core/testing';

import { HttpErrorHandlingService } from './http-error-handling.service';

describe('HttpErrorHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpErrorHandlingService = TestBed.get(HttpErrorHandlingService);
    expect(service).toBeTruthy();
  });
});
