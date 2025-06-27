import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '@shared/shared.module';
import { AdmSharedModule } from '@admin/administration/adm-shared/adm-shared.module';
import { HoursStatsComponent } from './summary/components/hours-stats/hours-stats.component';
import { BaseStatsComponent } from './summary/components/base-stats/base-stats.component';
import { QuickActionsComponent } from './summary/components/quick-actions/quick-actions.component';
import { CashierStatsComponent } from './summary/components/cashier-stats/cashier-stats.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementsTableComponent } from './movements/components/movements-table/movements-table.component';
import { DatePickerModalComponent } from './movements/components/date-picker-modal/date-picker-modal.component';
import { CloseCashRegisterBaseModalComponent } from './summary/components/close-cash-register-base-modal/close-cash-register-base-modal.component';
import { FinalWorkingHourFormComponent } from './summary/components/final-working-hour-form/final-working-hour-form.component';
import { UpdateCashRegisterBaseFormComponent } from './summary/components/update-cash-register-base-form/update-cash-register-base-form.component';
import { UpdateCashRegisterBaseModalComponent } from './summary/components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApertureStatsComponent } from './summary/components/aperture-stats/aperture-stats.component';

@NgModule({
  declarations: [
    SummaryComponent,
    HoursStatsComponent,
    BaseStatsComponent,
    QuickActionsComponent,
    CashierStatsComponent,
    MovementsComponent,
    MovementsTableComponent,
    DatePickerModalComponent,
    CloseCashRegisterBaseModalComponent,
    FinalWorkingHourFormComponent,
    UpdateCashRegisterBaseFormComponent,
    UpdateCashRegisterBaseModalComponent,
    ApertureStatsComponent,
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
