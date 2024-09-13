import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailableCashRegistersRoutingModule } from './available-cash-registers-routing.module';
import { AvailableCashRegistersComponent } from './available-cash-registers.component';

@NgModule({
  declarations: [AvailableCashRegistersComponent],
  imports: [CommonModule, AvailableCashRegistersRoutingModule],
})
export default class AvailableCashRegistersModule {}
