import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../../core/constants/valadation-errors';

export function DurationValidator(): ValidatorFn {
    return (control: AbstractControl):  ValidationErrors | null => {
        const n: number = Number(control.value);
        const isValid: boolean = !isNaN(n) && isFinite(n);
        return isValid ? null : { [ValidationErrorsKeys.number]: { value: control.value } } ;
    };
}
