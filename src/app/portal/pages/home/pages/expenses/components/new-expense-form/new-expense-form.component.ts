import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IExpenseReq } from '@models/expense.model';
import { ExpenseService } from '@services/expense.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-expense-form',
  templateUrl: './new-expense-form.component.html',
  styleUrls: ['./new-expense-form.component.css'],
})
export class NewExpenseFormComponent {
  readonly loading = signal<boolean>(false);
  readonly discount = signal<boolean>(false);
  readonly form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly myCashService: MyCashService,
    private readonly expenseService: ExpenseService,
    private readonly myHomeService: MyHomeService,
    private readonly formLoading: FormLoading
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(50)]],
      discount: [false, Validators.required],
      administrative: [false, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    const req: IExpenseReq = {
      ...this.form.value,
      cashRegisterDetailId: id,
    };

    this.expenseService.register(req).subscribe({
      next: (expense) => {
        this.myHomeService.pagination.set(expense.page);
        this.myHomeService.expenses.set(expense.content);
        this.resetForm();
        this.setLoading(false);
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  handleDiscount() {
    this.discount.update((prevValue) => !prevValue);
  }

  private resetForm() {
    this.form.reset();
    this.form.get('discount')?.setValue(false);
    this.discount.set(false);
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
