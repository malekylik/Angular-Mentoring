import { AbstractControl, ValidatorFn } from '@angular/forms';

export function DurationValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const n: number = Number(control.value);
        const isValid: boolean = !isNaN(n) && isFinite(n);
        return isValid ? null : { number: { value: control.value } } ;
    };
}
