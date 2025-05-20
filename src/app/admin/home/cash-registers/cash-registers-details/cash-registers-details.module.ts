import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersDetailsRoutingModule } from './cash-registers-details-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SummaryComponent],
  imports: [CommonModule, CashRegistersDetailsRoutingModule, SharedModule],
})
export default class CashRegistersDetailsModule {}
