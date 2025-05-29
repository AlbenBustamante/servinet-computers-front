import { Component, EventEmitter, Output } from '@angular/core';
import { IUpdateExpenseDto } from '@models/expense.model';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-update-expense-form',
  templateUrl: './update-expense-form.component.html',
})
export class UpdateExpenseFormComponent {
  @Output() onSubmit = new EventEmitter<IUpdateExpenseDto>();
  readonly form;

  constructor(private readonly myHomeService: MyHomeService) {
    this.form = this.myHomeService.updateExpenseForm;
  }

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.onSubmit.emit(this.form.value);
  }

  get discount(): boolean {
    return this.form.get('discount')?.value;
  }
}
