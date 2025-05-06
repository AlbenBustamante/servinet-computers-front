import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-bank-deposit-form',
  templateUrl: './new-bank-deposit-form.component.html',
  styleUrls: ['./new-bank-deposit-form.component.css'],
})
export class NewBankDepositFormComponent {
  @Output() onCancel = new EventEmitter<void>();
  readonly faCancel = faTrashAlt;
  readonly form;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      collector: ['', Validators.required],
      expenseNote: [],
      expenseValue: [, Validators.min(0)],
    });
  }

  onSubmit() {}

  emitOnCancel() {
    this.form.reset();
    this.onCancel.emit();
  }
}
