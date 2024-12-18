import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NewTransactionFormComponent } from './components/new-transaction-form/new-transaction-form.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionDetailTypePipe } from 'app/core/pipes/transaction-detail-type.pipe';

@NgModule({
  declarations: [
    TransactionsComponent,
    NewTransactionFormComponent,
    TransactionsTableComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TransactionDetailTypePipe,
  ],
})
export default class TransactionsModule {}
