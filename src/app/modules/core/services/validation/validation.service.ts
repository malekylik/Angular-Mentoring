import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { ValidationErrorsKeys } from '../../constants/valadation-errors';

@Injectable()
export class ValidationService {

  constructor() { }

  validate(errors: ValidationErrors | null): string {
    if (!errors) return '';

    if (errors[ValidationErrorsKeys.required]) {
      return 'Field is required';
    } else if (errors[ValidationErrorsKeys.maxLength]) {
      const error = errors[ValidationErrorsKeys.maxLength];
      return `Field should be less than ${error.requiredLength} characters. Got ${error.actualLength}`;
    } else if (errors[ValidationErrorsKeys.dateFormat]) {
      const error = errors[ValidationErrorsKeys.dateFormat];
      return `Date format should be ${error.required}`;
    } else if (errors[ValidationErrorsKeys.dateValue]) {
      return 'Invalid date value';
    } else if (errors[ValidationErrorsKeys.number]) {
      return 'Only numbers allowed';
    } else if (errors[ValidationErrorsKeys.authorsLength]) {
      return 'At least one author should be';
    }

    return 'Error';
  }
}
