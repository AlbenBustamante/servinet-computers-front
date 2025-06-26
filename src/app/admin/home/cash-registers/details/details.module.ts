import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '@shared/shared.module';
import { HomeSharedModule } from '@admin/home/home-shared/home-shared.module';
import { HoursStatsComponent } from './summary/components/hours-stats/hours-stats.component';
import { BaseStatsComponent } from './summary/components/base-stats/base-stats.component';
import { QuickActionsComponent } from './summary/components/quick-actions/quick-actions.component';
import { BasicInfoComponent } from './summary/components/basic-info/basic-info.component';
import { MovementsComponent } from './movements/movements.component';
import { MovementsTableComponent } from './movements/components/movements-table/movements-table.component';
import { DatePickerModalComponent } from './movements/components/date-picker-modal/date-picker-modal.component';
import { CloseCashRegisterBaseModalComponent } from './summary/components/close-cash-register-base-modal/close-cash-register-base-modal.component';
import { FinalWorkingHourFormComponent } from './summary/components/final-working-hour-form/final-working-hour-form.component';
import { UpdateCashRegisterBaseFormComponent } from './summary/components/update-cash-register-base-form/update-cash-register-base-form.component';
import { UpdateCashRegisterBaseModalComponent } from './summary/components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SummaryComponent,
    HoursStatsComponent,
    BaseStatsComponent,
    QuickActionsComponent,
    BasicInfoComponent,
    MovementsComponent,
    MovementsTableComponent,
    DatePickerModalComponent,
    CloseCashRegisterBaseModalComponent,
    FinalWorkingHourFormComponent,
    UpdateCashRegisterBaseFormComponent,
    UpdateCashRegisterBaseModalComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule,
    HomeSharedModule,
    ReactiveFormsModule,
  ],
})
export default class DetailsModule {}
