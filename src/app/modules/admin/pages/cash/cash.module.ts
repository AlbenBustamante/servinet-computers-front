import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRoutingModule } from './cash-routing.module';
import { CashComponent } from './cash.component';
import { SharedModule } from '@shared/shared.module';
import { NewCashRegisterFormComponent } from './components/new-cash-register-form/new-cash-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CashComponent, NewCashRegisterFormComponent],
  imports: [CommonModule, CashRoutingModule, SharedModule, ReactiveFormsModule],
})
export default class CashModule {}
