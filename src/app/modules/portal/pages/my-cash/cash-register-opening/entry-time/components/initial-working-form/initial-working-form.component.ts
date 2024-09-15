import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-initial-working-form',
  templateUrl: './initial-working-form.component.html',
  styleUrls: ['./initial-working-form.component.css'],
})
export class InitialWorkingFormComponent {
  @Output() setInitialWorking = new EventEmitter<string>();
  @Output() onReturn = new EventEmitter();
  readonly initialWorkingForm: FormGroup;
  readonly faReturn = faArrowLeft;

  constructor(
    private readonly fb: FormBuilder,
    private readonly myCashService: MyCashService
  ) {
    this.initialWorkingForm = this.fb.group({
      initialWorking: [
        this.myCashService.workingHours.split(';')[0],
        Validators.required,
      ],
    });
  }

  emitInitialWorking() {
    if (this.initialWorkingForm.invalid) {
      this.initialWorkingForm.markAllAsTouched();

      return this.setInitialWorking.emit('');
    }

    this.setInitialWorking.emit(this.initialWorkingForm.value.initialWorking);
  }

  emitReturn() {
    this.onReturn.emit();
  }
}
