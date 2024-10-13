import { Component } from '@angular/core';
import { IExpenseReq } from '@models/expense.model';
import { ExpenseService } from '@services/expense.service';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent {
  constructor(
    private readonly myCashService: MyCashService,
    private readonly expenseService: ExpenseService
  ) {}

  onSubmit(req: IExpenseReq) {
    const cashRegisterDetailId =
      this.myCashService.currentCashRegister()!.cashRegisterDetail.id;

    req.cashRegisterDetailId = cashRegisterDetailId;
  }
}
