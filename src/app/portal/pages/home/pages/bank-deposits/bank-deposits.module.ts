import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDepositsRoutingModule } from './bank-deposits-routing.module';
import { BankDepositsComponent } from './bank-deposits.component';
import { SharedModule } from '@shared/shared.module';
import { BankDepositItemComponent } from './components/bank-deposit-item/bank-deposit-item.component';
import { NewBankDepositFormComponent } from './components/new-bank-deposit-form/new-bank-deposit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewDepositorFormComponent } from './components/new-depositor-form/new-depositor-form.component';
import { BankDepositInfoListComponent } from './components/bank-deposit-info-list/bank-deposit-info-list.component';

@NgModule({
  declarations: [
    BankDepositsComponent,
    BankDepositItemComponent,
    NewBankDepositFormComponent,
    NewDepositorFormComponent,
    BankDepositInfoListComponent,
  ],
  imports: [
    CommonModule,
    BankDepositsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class BankDepositsModule {}
