import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDepositsRoutingModule } from './bank-deposits-routing.module';
import { BankDepositsComponent } from './bank-deposits.component';

@NgModule({
  declarations: [BankDepositsComponent],
  imports: [CommonModule, BankDepositsRoutingModule],
})
export default class BankDepositsModule {}
