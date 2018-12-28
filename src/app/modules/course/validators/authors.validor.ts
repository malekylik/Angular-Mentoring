import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../../core/constants/valadation-errors';

export function AuthorsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const length: number = control.value.length;
        return length ? null : { [ValidationErrorsKeys.authorsLength]: { length } };
    };
}
