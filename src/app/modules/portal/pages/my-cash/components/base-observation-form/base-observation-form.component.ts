import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-base-observation-form',
  templateUrl: './base-observation-form.component.html',
  styleUrls: ['./base-observation-form.component.css'],
})
export class BaseObservationFormComponent {
  readonly observationControl: FormControl;
  @Output() setObservation = new EventEmitter<string>();

  constructor() {
    this.observationControl = new FormControl('');
  }

  emitObservation() {
    this.setObservation.emit(this.observationControl.value);
  }
}
