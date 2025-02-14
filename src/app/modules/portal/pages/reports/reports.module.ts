import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionDetailTypePipe } from 'app/core/pipes/transaction-detail-type.pipe';
import { PlatformTransfersTableComponent } from './components/platform-transfers-table/platform-transfers-table.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { DiscountsTableComponent } from './components/discounts-table/discounts-table.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { TransfersTableComponent } from './components/transfers-table/transfers-table.component';
import { ReportsTablesComponent } from './components/reports-tables/reports-tables.component';
import { ChangeTypeFormComponent } from './components/change-type-form/change-type-form.component';

@NgModule({
  declarations: [ReportsComponent, PlatformTransfersTableComponent, ExpensesTableComponent, DiscountsTableComponent, TransactionsTableComponent, TransfersTableComponent, ReportsTablesComponent, ChangeTypeFormComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TransactionDetailTypePipe,
  ],
})
export default class ReportsModule {}
