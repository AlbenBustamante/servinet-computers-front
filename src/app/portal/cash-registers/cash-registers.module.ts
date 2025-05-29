import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseCalculatorComponent } from './components/base-calculator/base-calculator.component';
import { AvailableCashRegistersComponent } from './available-cash-registers/available-cash-registers.component';
import { CashRegisterCardComponent } from './available-cash-registers/components/cash-register-card/cash-register-card.component';

@NgModule({
  declarations: [
    CashRegistersComponent,
    BaseCalculatorComponent,
    AvailableCashRegistersComponent,
    CashRegisterCardComponent,
  ],
  imports: [
    CommonModule,
    CashRegistersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [BaseCalculatorComponent],
})
export default class CashRegistersModule {}
