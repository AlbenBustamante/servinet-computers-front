import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DateRangeService } from '@services/date-range.service';
import { SharedModule } from '@shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { CalendarsFormComponent } from './components/calendars-form/calendars-form.component';
import { TransfersTableComponent } from './components/transfers-table/transfers-table.component';
import { FinalStatsComponent } from './components/final-stats/final-stats.component';

@NgModule({
  declarations: [
    ReportsComponent,
    CalendarsFormComponent,
    TransfersTableComponent,
    FinalStatsComponent,
  ],
  providers: [DateRangeService],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ReportsModule {}
