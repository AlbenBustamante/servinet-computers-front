import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesRoutingModule } from './balances-routing.module';
import { BalancesComponent } from './balances.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BalancesComponent],
  imports: [
    CommonModule,
    BalancesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class BalancesModule {}
