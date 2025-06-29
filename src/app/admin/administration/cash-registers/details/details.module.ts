import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '@shared/shared.module';
import { AdmSharedModule } from '@admin/administration/adm-shared/adm-shared.module';
import { JourneyStatsComponent } from './summary/components/journey-stats/journey-stats.component';
import { QuickActionsComponent } from './summary/components/quick-actions/quick-actions.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementsTableComponent } from './movements/components/movements-table/movements-table.component';
import { DatePickerModalComponent } from './movements/components/date-picker-modal/date-picker-modal.component';
import { CloseCashRegisterBaseModalComponent } from './summary/components/close-cash-register-base-modal/close-cash-register-base-modal.component';
import { FinalWorkingHourFormComponent } from './summary/components/final-working-hour-form/final-working-hour-form.component';
import { UpdateCashRegisterBaseFormComponent } from './summary/components/update-cash-register-base-form/update-cash-register-base-form.component';
import { UpdateCashRegisterBaseModalComponent } from './summary/components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainStatsComponent } from './summary/components/main-stats/main-stats.component';
import { MainStatCardComponent } from './summary/components/main-stat-card/main-stat-card.component';
import { MovementsTablesComponent } from './summary/components/movements-tables/movements-tables.component';
import { TransactionsTableComponent } from './summary/components/transactions-table/transactions-table.component';
import { TransfersTableComponent } from './summary/components/transfers-table/transfers-table.component';
import { ExpensesTableComponent } from './summary/components/expenses-table/expenses-table.component';
import { DiscountsTableComponent } from './summary/components/discounts-table/discounts-table.component';
import { BanksTableComponent } from './summary/components/banks-table/banks-table.component';

@NgModule({
  declarations: [
    SummaryComponent,
    JourneyStatsComponent,
    QuickActionsComponent,
    MovementsComponent,
    MovementsTableComponent,
    DatePickerModalComponent,
    CloseCashRegisterBaseModalComponent,
    FinalWorkingHourFormComponent,
    UpdateCashRegisterBaseFormComponent,
    UpdateCashRegisterBaseModalComponent,
    MainStatsComponent,
    MainStatCardComponent,
    MovementsTablesComponent,
    TransactionsTableComponent,
    TransfersTableComponent,
    ExpensesTableComponent,
    DiscountsTableComponent,
    BanksTableComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule,
    AdmSharedModule,
    ReactiveFormsModule,
  ],
})
export default class DetailsModule {}
