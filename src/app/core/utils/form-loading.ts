import { Injectable, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormLoading {
  setLoading(
    form: FormGroup,
    loadingSignal: WritableSignal<boolean>,
    loading: boolean
  ) {
    loadingSignal.set(loading);

    loading ? form.disable() : form.enable();
  }
}
