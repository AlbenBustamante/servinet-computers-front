import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterMovementsRoutingModule } from './cash-register-movements-routing.module';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { CashRegisterMovementComponent } from './components/cash-register-movement/cash-register-movement.component';
import { CashRegisterMovementsListComponent } from './components/cash-register-movements-list/cash-register-movements-list.component';

@NgModule({
  declarations: [
    CashRegisterMovementsComponent,
    CashRegisterMovementComponent,
    CashRegisterMovementsListComponent,
  ],
  imports: [
    CommonModule,
    CashRegisterMovementsRoutingModule,
    SharedModule,
    RouterModule,
  ],
})
export default class CashRegisterMovementsModule {}
