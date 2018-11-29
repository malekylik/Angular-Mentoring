import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HttpErrorHandlingService } from './http-error-handling.service';

describe('HttpErrorHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule],
    providers: [HttpErrorHandlingService],
  }));

  it('should be created', () => {
    const service: HttpErrorHandlingService = TestBed.get(HttpErrorHandlingService);
    expect(service).toBeTruthy();
  });
});
