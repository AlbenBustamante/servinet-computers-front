import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterDetailsRoutingModule } from './cash-register-details-routing.module';
import { CashRegisterDetailsComponent } from './cash-register-details.component';

@NgModule({
  declarations: [CashRegisterDetailsComponent],
  imports: [CommonModule, CashRegisterDetailsRoutingModule],
})
export default class CashRegisterDetailsModule {}
