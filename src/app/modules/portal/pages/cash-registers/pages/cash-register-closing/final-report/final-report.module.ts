import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalReportRoutingModule } from './final-report-routing.module';
import { FinalReportComponent } from './final-report.component';

@NgModule({
  declarations: [
    FinalReportComponent
  ],
  imports: [CommonModule, FinalReportRoutingModule],
})
export default class FinalReportModule {}
