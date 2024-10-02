import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { SharedModule } from '@shared/shared.module';
import { CashRegisterStatusPipe } from '../../../../core/pipes/cash-register-status.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseCalculatorComponent } from './components/base-calculator/base-calculator.component';

@NgModule({
  declarations: [CashRegistersComponent, BaseCalculatorComponent],
  imports: [
    CommonModule,
    CashRegistersRoutingModule,
    SharedModule,
    CashRegisterStatusPipe,
    ReactiveFormsModule,
  ],
  exports: [BaseCalculatorComponent],
})
export default class CashRegistersModule {}
