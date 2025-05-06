import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDepositsRoutingModule } from './bank-deposits-routing.module';
import { BankDepositsComponent } from './bank-deposits.component';
import { SharedModule } from '@shared/shared.module';
import { BankDepositItemComponent } from './components/bank-deposit-item/bank-deposit-item.component';
import { NewBankDepositFormComponent } from './components/new-bank-deposit-form/new-bank-deposit-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BankDepositsComponent,
    BankDepositItemComponent,
    NewBankDepositFormComponent,
  ],
  imports: [
    CommonModule,
    BankDepositsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class BankDepositsModule {}
