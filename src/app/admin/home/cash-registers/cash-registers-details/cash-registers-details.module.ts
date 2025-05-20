import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersDetailsRoutingModule } from './cash-registers-details-routing.module';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [SummaryComponent],
  imports: [CommonModule, CashRegistersDetailsRoutingModule],
})
export default class CashRegistersDetailsModule {}
