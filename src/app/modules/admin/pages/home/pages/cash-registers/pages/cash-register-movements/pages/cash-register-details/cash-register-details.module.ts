import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterDetailsRoutingModule } from './cash-register-details-routing.module';
import { CashRegisterDetailsComponent } from './cash-register-details.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CashRegisterDetailsComponent],
  imports: [CommonModule, CashRegisterDetailsRoutingModule, SharedModule],
})
export default class CashRegisterDetailsModule {}
