import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-bank-deposit-form',
  templateUrl: './new-bank-deposit-form.component.html',
  styleUrls: ['./new-bank-deposit-form.component.css'],
})
export class NewBankDepositFormComponent {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) loading!: boolean;
  readonly faCancel = faTrashAlt;
  readonly expensive = signal<boolean>(false);

  toggleExpensive() {
    this.expensive.update((prevValue) => !prevValue);
  }

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.onSubmit.emit();
  }

  emitOnCancel() {
    this.form.reset();
    this.onCancel.emit();
  }
}
