import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterClosingRoutingModule } from './cash-register-closing-routing.module';
import { CashRegisterClosingComponent } from './cash-register-closing.component';

@NgModule({
  declarations: [CashRegisterClosingComponent],
  imports: [CommonModule, CashRegisterClosingRoutingModule],
})
export default class CashRegisterClosingModule {}
