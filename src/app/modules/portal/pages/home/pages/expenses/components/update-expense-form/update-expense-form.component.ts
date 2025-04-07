import { Component, EventEmitter, Output } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-update-expense-form',
  templateUrl: './update-expense-form.component.html',
  styleUrls: ['./update-expense-form.component.css'],
})
export class UpdateExpenseFormComponent {
  @Output() onSubmit = new EventEmitter<void>();
  readonly form;

  constructor(private readonly myHomeService: MyHomeService) {
    this.form = this.myHomeService.updateExpenseForm;
  }

  emitOnSubmit() {
    this.onSubmit.emit();
  }

  get discount(): boolean {
    return this.form.get('discount')?.value;
  }
}
