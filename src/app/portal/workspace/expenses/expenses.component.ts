import { Component, signal, ViewChild } from '@angular/core';
import { IExpenseReq, IUpdateExpenseDto } from '@models/expense.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { ExpenseService } from '@services/expense.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { TempCodeFormComponent } from '@shared/components/temp-code-form/temp-code-form.component';
import { UpdateExpenseFormComponent } from './components/update-expense-form/update-expense-form.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
})
export class ExpensesComponent {
  @ViewChild(UpdateExpenseFormComponent)
  updateExpenseForm!: UpdateExpenseFormComponent;
  @ViewChild(TempCodeFormComponent) tempCodeForm!: TempCodeFormComponent;

  private readonly expenseToUpdateId = signal<number>(-1);
  private readonly expenseToDeleteId = signal<number>(-1);
  readonly showSideBarUpdate = signal<boolean>(false);
  readonly showSideBarDelete = signal<boolean>(false);
  readonly updateLoading = signal<boolean>(false);
  readonly deleteLoading = signal<boolean>(false);
  readonly loading;
  readonly expenses;
  readonly pagination;
  readonly paginationLoading;

  constructor(
    private readonly myCashService: MyCashService,
    private readonly myHomeService: MyHomeService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly expenseService: ExpenseService
  ) {
    this.loading = this.myHomeService.loading;
    this.expenses = this.myHomeService.expenses;
    this.pagination = this.myHomeService.pagination;
    this.paginationLoading = this.myHomeService.paginationLoading;
  }

  onSubmit(req: IExpenseReq) {
    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    req.cashRegisterDetailId = id;
  }

  ngOnInit() {
    this.loading.set(true);

    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    this.cashRegisterDetailService.getExpenses(id).subscribe({
      next: (expenses) => {
        this.expenses.set(expenses.content);
        this.pagination.set(expenses.page);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  onSelectPage(page: number) {
    this.paginationLoading.set(true);

    const { id } = this.myCashService.currentCashRegister()!.cashRegisterDetail;

    this.cashRegisterDetailService.getExpenses(id, page).subscribe({
      next: (expenses) => {
        this.pagination.set(expenses.page);
        this.expenses.set(expenses.content);
        this.paginationLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.paginationLoading.set(false);
      },
    });
  }

  tableOnEdit(id: number) {
    this.expenseToUpdateId.set(id);
    this.showSideBarUpdate.set(true);
  }

  tableOnRemove(id: number) {
    this.expenseToDeleteId.set(id);
    this.showSideBarDelete.set(true);
  }

  update(dto: IUpdateExpenseDto) {
    this.updateLoading.set(true);

    this.expenseService.update(this.expenseToUpdateId(), dto).subscribe({
      next: (expense) => {
        this.expenses.update((prevValue) => {
          const index = prevValue.findIndex((e) => e.id === expense.id);

          if (index > -1) {
            prevValue[index] = expense;
          }

          return prevValue;
        });

        this.updateLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.updateLoading.set(false);
      },
      complete: () => this.showSideBarUpdate.set(false),
    });
  }

  remove(code: string) {
    this.deleteLoading.set(true);

    this.expenseService.delete(this.expenseToDeleteId(), code).subscribe({
      next: () => {
        this.expenses.update((prevValue) => {
          const index = prevValue.findIndex(
            (e) => e.id === this.expenseToDeleteId()
          );

          if (index > -1) {
            prevValue.splice(index, 1);
          }

          return prevValue;
        });

        this.deleteLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.deleteLoading.set(false);
      },
      complete: () => this.showSideBarDelete.set(false),
    });
  }
}
