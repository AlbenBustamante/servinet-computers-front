import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterOpeningRoutingModule } from './cash-register-opening-routing.module';
import { CashRegisterOpeningComponent } from './cash-register-opening.component';

@NgModule({
  declarations: [CashRegisterOpeningComponent],
  imports: [CommonModule, CashRegisterOpeningRoutingModule],
})
export default class CashRegisterOpeningModule {}
