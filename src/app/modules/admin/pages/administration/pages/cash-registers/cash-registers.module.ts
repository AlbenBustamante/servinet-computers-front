import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CashRegistersComponent],
  imports: [CommonModule, CashRegistersRoutingModule, FontAwesomeModule],
})
export default class CashRegistersModule {}
