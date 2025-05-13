import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-temp-code-form',
  templateUrl: './temp-code-form.component.html',
  styleUrls: ['./temp-code-form.component.css'],
})
export class TempCodeFormComponent {
  @Output() onSubmit = new EventEmitter<string>();
  readonly form;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      tempCode: [null, Validators.required],
    });
  }

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const { tempCode } = this.form.value;

    this.form.reset();
    this.onSubmit.emit(tempCode!);
  }
}
