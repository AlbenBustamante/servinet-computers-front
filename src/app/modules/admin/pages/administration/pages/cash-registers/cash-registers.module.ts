import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';

@NgModule({
  declarations: [
    CashRegistersComponent
  ],
  imports: [CommonModule, CashRegistersRoutingModule],
})
export default class CashRegistersModule {}
