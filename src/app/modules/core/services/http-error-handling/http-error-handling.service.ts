import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { ERROR_SNACKBAR_CONFIG, UNKNOWN_ERROR_MESSAGE } from '../../constants/errors';

@Injectable()
export class HttpErrorHandlingService {

  constructor(private snackBar: MatSnackBar) { }

  handlingError(error: HttpErrorResponse) {
    if (typeof error.error === 'string') {
      this.snackBar.open(error.error, '', ERROR_SNACKBAR_CONFIG);
    } else {
      this.snackBar.open(UNKNOWN_ERROR_MESSAGE, '', ERROR_SNACKBAR_CONFIG);
    }
  }
}
