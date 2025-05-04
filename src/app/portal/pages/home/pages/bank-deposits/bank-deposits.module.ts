import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDepositsRoutingModule } from './bank-deposits-routing.module';
import { BankDepositsComponent } from './bank-deposits.component';
import { SharedModule } from '@shared/shared.module';
import { BankDepositItemComponent } from './components/bank-deposit-item/bank-deposit-item.component';

@NgModule({
  declarations: [BankDepositsComponent, BankDepositItemComponent],
  imports: [CommonModule, BankDepositsRoutingModule, SharedModule],
})
export default class BankDepositsModule {}
