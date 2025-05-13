import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalBaseRoutingModule } from './final-base-routing.module';
import { FinalBaseComponent } from './final-base.component';
import { SharedModule } from '@shared/shared.module';
import CashRegistersModule from '@portal/pages/cash-registers/cash-registers.module';

@NgModule({
  declarations: [FinalBaseComponent],
  imports: [
    CommonModule,
    FinalBaseRoutingModule,
    SharedModule,
    CashRegistersModule,
  ],
})
export default class FinalBaseModule {}
