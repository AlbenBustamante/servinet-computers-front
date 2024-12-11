import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NewTransactionFormComponent } from './components/new-transaction-form/new-transaction-form.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    NewTransactionFormComponent,
    TransactionsTableComponent
  ],
  imports: [CommonModule, TransactionsRoutingModule],
})
export default class TransactionsModule {}
