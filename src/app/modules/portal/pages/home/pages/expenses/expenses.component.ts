import { Component } from '@angular/core';
import { IExpenseReq } from '@models/expense.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent {
  readonly loading;
  readonly expenses;

  constructor(
    private readonly myCashService: MyCashService,
    private readonly myHomeService: MyHomeService,
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {
    this.loading = this.myHomeService.loading;
    this.expenses = this.myHomeService.expenses;
  }

  onSubmit(req: IExpenseReq) {
    const cashRegisterDetailId =
      this.myCashService.currentCashRegister()!.cashRegisterDetail.id;

    req.cashRegisterDetailId = cashRegisterDetailId;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService
      .getExpenses(
        this.myCashService.currentCashRegister()!.cashRegisterDetail.id
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
