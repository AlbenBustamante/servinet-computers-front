import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarsFormComponent } from './components/calendars-form/calendars-form.component';
import { TransfersTableComponent } from './components/transfers-table/transfers-table.component';
import { FinalStatsComponent } from './components/final-stats/final-stats.component';

@NgModule({
  declarations: [ReportsComponent, CalendarsFormComponent, TransfersTableComponent, FinalStatsComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule],
})
export class ReportsModule {}
