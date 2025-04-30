import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { NewExpenseFormComponent } from './components/new-expense-form/new-expense-form.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { UpdateExpenseFormComponent } from './components/update-expense-form/update-expense-form.component';

@NgModule({
  declarations: [ExpensesComponent, NewExpenseFormComponent, ExpensesTableComponent, UpdateExpenseFormComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class ExpensesModule {}
