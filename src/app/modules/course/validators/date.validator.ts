import { AbstractControl, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const m: RegExpMatchArray = (control.value as string).match(/\d{1,2}.\d{1,2}.\d{1,4}/);
        const isValid: boolean = Boolean(m) && m[0].length === control.value.length;
        return isValid ? null : { 'dateFormat': { value: control.value, required: 'dd.MM.yyyy' } };
    };
}
