import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import AdmItemCardComponent from '../../administration.module';

@NgModule({
  declarations: [CashRegistersComponent],
  imports: [CommonModule, CashRegistersRoutingModule, AdmItemCardComponent],
})
export default class CashRegistersModule {}
