import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-depositor-form',
  templateUrl: './new-depositor-form.component.html',
  styleUrls: ['./new-depositor-form.component.css'],
})
export class NewDepositorFormComponent {
  @Output() onSubmit = new EventEmitter<void>();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) loading!: boolean;

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.onSubmit.emit();
  }
}
