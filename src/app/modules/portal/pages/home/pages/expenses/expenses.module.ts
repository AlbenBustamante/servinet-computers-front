import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';
import { NewExpenseFormComponent } from './components/new-expense-form/new-expense-form.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExpensesComponent, NewExpenseFormComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class ExpensesModule {}
