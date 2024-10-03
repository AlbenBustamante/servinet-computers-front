import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalReportRoutingModule } from './final-report-routing.module';
import { FinalReportComponent } from './final-report.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [FinalReportComponent],
  imports: [CommonModule, FinalReportRoutingModule, SharedModule],
})
export default class FinalReportModule {}
