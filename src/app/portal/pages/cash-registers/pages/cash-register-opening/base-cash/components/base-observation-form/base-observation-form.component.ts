import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-base-observation-form',
  templateUrl: './base-observation-form.component.html',
  styleUrls: ['./base-observation-form.component.css'],
})
export class BaseObservationFormComponent {
  @Output() setObservation = new EventEmitter<string>();
  readonly observationControl: FormControl;

  constructor(private readonly myCashService: MyCashService) {
    this.observationControl = new FormControl(this.myCashService.observation);
  }

  emitObservation() {
    this.setObservation.emit(this.observationControl.value);
  }
}
