import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { SharedModule } from '@shared/shared.module';
import { NewCashRegisterFormComponent } from './components/new-cash-register-form/new-cash-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CashRegistersComponent, NewCashRegisterFormComponent],
  imports: [CommonModule, CashRegistersRoutingModule, SharedModule, ReactiveFormsModule],
})
export default class CashRegistersModule {}
