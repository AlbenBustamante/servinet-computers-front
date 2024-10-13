import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExpenseReq } from '@models/expense.model';
import { ExpenseService } from '@services/expense.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-new-expense-form',
  templateUrl: './new-expense-form.component.html',
  styleUrls: ['./new-expense-form.component.css'],
})
export class NewExpenseFormComponent {
  readonly loading = signal<boolean>(false);
  readonly form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly myCashService: MyCashService,
    private readonly expenseService: ExpenseService
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(50)]],
      discount: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const cashRegisterDetailId =
      this.myCashService.currentCashRegister()!.cashRegisterDetail.id;

    const req: IExpenseReq = {
      ...this.form.value,
      cashRegisterDetailId,
    };

    this.expenseService.register(req).subscribe({
      next: (_) => {
        this.form.reset();
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.loading.set(loading);

    loading ? this.form.disable() : this.form.enable();
  }
}
