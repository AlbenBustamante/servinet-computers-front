import { Component, signal } from '@angular/core';
import { IExpenseRes } from '@models/expense.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent {
  readonly loading = signal<boolean>(false);
  readonly expenses = signal<IExpenseRes[]>([]);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly myCashService: MyCashService
  ) {}

  onOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService
      .getExpenses(
        this.myCashService.currentCashRegister()?.cashRegisterDetail.id!
      )
      .subscribe({
        next: (expenses) => {
          this.expenses.set(expenses);
          this.loading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
  }
}
