import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterMovementsRoutingModule } from './cash-register-movements-routing.module';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';

@NgModule({
  declarations: [CashRegisterMovementsComponent],
  imports: [CommonModule, CashRegisterMovementsRoutingModule],
})
export default class CashRegisterMovementsModule {}
