import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-initial-working-form',
  templateUrl: './initial-working-form.component.html',
  styleUrls: ['./initial-working-form.component.css'],
})
export class InitialWorkingFormComponent {
  readonly initialWorkingForm: FormGroup;
  @Output() setInitialWorking = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder) {
    this.initialWorkingForm = this.fb.group({
      initialWorking: ['', Validators.required],
    });
  }

  emitInitialWorking() {
    if (this.initialWorkingForm.invalid) {
      this.initialWorkingForm.markAllAsTouched();

      return this.setInitialWorking.emit('');
    }

    this.setInitialWorking.emit(this.initialWorkingForm.value.initialWorking);
  }
}
