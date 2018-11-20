import { MatSnackBarConfig } from '@angular/material';

const ERROR_SNACKBAR_DURATION: number = 1000;

const UNKNOWN_ERROR_MESSAGE: string = 'Something went wrong';

const ERROR_SNACKBAR_CONFIG: MatSnackBarConfig<any> = { duration: ERROR_SNACKBAR_DURATION };

export {
    ERROR_SNACKBAR_DURATION,
    UNKNOWN_ERROR_MESSAGE,
    ERROR_SNACKBAR_CONFIG,
};
