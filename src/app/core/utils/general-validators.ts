import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GeneralValidators {
  hasError(form: FormGroup, controlName: string, errorName: string) {
    return (
      this.isInvalid(form, controlName) &&
      form.controls[controlName].hasError(errorName)
    );
  }

  isInvalid(form: FormGroup, controlName: string) {
    return (
      form.controls[controlName].touched && form.controls[controlName].invalid
    );
  }
}
