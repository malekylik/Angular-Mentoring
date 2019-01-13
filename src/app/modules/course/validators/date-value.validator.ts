import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../../core/constants/valadation-errors';
import { FromDMYtoMDYDatePipe } from '../pipes/from-dmy-to-mdy-date/from-dmy-to-mdy-date.pipe';

export function DateValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date: string = new FromDMYtoMDYDatePipe().transform(control.value);
        let isValid: boolean = true;

        try {
            new Date(date).toISOString();
        } catch (e) {
            isValid = false;
        }

        return isValid ? null : { [ValidationErrorsKeys.dateValue]: { value: control.value } };
    };
}
