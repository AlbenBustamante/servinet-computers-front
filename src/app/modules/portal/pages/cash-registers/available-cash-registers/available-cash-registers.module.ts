import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailableCashRegistersRoutingModule } from './available-cash-registers-routing.module';
import { AvailableCashRegistersComponent } from './available-cash-registers.component';
import { CashRegisterCardComponent } from './components/cash-register-card/cash-register-card.component';
import { SharedModule } from '@shared/shared.module';
import { CashRegisterStatusPipe } from '../../../../../core/pipes/cash-register-status.pipe';

@NgModule({
  declarations: [AvailableCashRegistersComponent, CashRegisterCardComponent],
  imports: [
    CommonModule,
    AvailableCashRegistersRoutingModule,
    SharedModule,
    CashRegisterStatusPipe,
  ],
})
export default class AvailableCashRegistersModule {}
