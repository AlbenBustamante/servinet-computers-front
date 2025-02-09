import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterMovementsRoutingModule } from './cash-register-movements-routing.module';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';
import { SharedModule } from '@shared/shared.module';
import { CashRegisterDetailStatusPipe } from 'app/core/pipes/cash-register-detail-status.pipe';

@NgModule({
  declarations: [CashRegisterMovementsComponent],
  imports: [
    CommonModule,
    CashRegisterMovementsRoutingModule,
    SharedModule,
    CashRegisterDetailStatusPipe,
  ],
})
export default class CashRegisterMovementsModule {}
