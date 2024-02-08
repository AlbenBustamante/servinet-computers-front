import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GeneralValidators {
  hasError(form: FormGroup, controlName: string, errorName: string) {
    return form.controls[controlName].hasError(errorName);
  }
}
