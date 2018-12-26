import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../../core/constants/valadation-errors';

export function DateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const m: RegExpMatchArray = (control.value as string).match(/\d{1,2}.\d{1,2}.\d{1,4}/);
        const isValid: boolean = Boolean(m) && m[0].length === control.value.length;
        return isValid ? null : { [ValidationErrorsKeys.dateFormat]: { value: control.value, required: 'dd.MM.yyyy' } };
    };
}
