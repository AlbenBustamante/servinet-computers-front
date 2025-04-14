import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterDetailsRoutingModule } from './cash-register-details-routing.module';
import { CashRegisterDetailsComponent } from './cash-register-details.component';
import { SharedModule } from '@shared/shared.module';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { CashRegisterDetailsModalComponent } from './components/cash-register-details-modal/cash-register-details-modal.component';
import { DetailedTransactionsTableComponent } from './components/detailed-transactions-table/detailed-transactions-table.component';
import { DetailedExpensesTableComponent } from './components/detailed-expenses-table/detailed-expenses-table.component';
import { DetailedDiscountsTableComponent } from './components/detailed-discounts-table/detailed-discounts-table.component';
import { DetailedTransfersTableComponent } from './components/detailed-transfers-table/detailed-transfers-table.component';
import { HourStatComponent } from './components/hour-stat/hour-stat.component';
import { CashierHourStatsComponent } from './components/cashier-hour-stats/cashier-hour-stats.component';
import { CashierSomeStatsComponent } from './components/cashier-some-stats/cashier-some-stats.component';
import { CashierObservationsComponent } from './components/cashier-observations/cashier-observations.component';
import { SomeStatComponent } from './components/some-stat/some-stat.component';
import { CashierDiscrepancyComponent } from './components/cashier-discrepancy/cashier-discrepancy.component';
import { DetailedChangeLogsTableComponent } from './components/detailed-change-logs-table/detailed-change-logs-table.component';
import { DetailedChangeLogsComponent } from './components/detailed-change-logs/detailed-change-logs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CashRegisterDetailsComponent,
    StatCardComponent,
    HeaderStatsComponent,
    CashRegisterDetailsModalComponent,
    DetailedTransactionsTableComponent,
    DetailedExpensesTableComponent,
    DetailedDiscountsTableComponent,
    DetailedTransfersTableComponent,
    HourStatComponent,
    CashierHourStatsComponent,
    CashierSomeStatsComponent,
    CashierObservationsComponent,
    SomeStatComponent,
    CashierDiscrepancyComponent,
    DetailedChangeLogsTableComponent,
    DetailedChangeLogsComponent,
  ],
  imports: [
    CommonModule,
    CashRegisterDetailsRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export default class CashRegisterDetailsModule {}
