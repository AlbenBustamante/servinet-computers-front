import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRoutingModule } from './my-cash-routing.module';
import { MyCashComponent } from './my-cash.component';
import { SharedModule } from '@shared/shared.module';
import { CashRegisterStatusPipe } from 'app/core/pipes/cash-register-status.pipe';

@NgModule({
  declarations: [MyCashComponent],
  imports: [
    CommonModule,
    MyCashRoutingModule,
    SharedModule,
    CashRegisterStatusPipe,
  ],
})
export default class MyCashModule {}
