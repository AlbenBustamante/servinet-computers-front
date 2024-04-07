import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTransactionFormComponent } from './components/new-transaction-form/new-transaction-form.component';
import { NewCashRegisterTransferFormComponent } from './components/new-cash-register-transfer-form/new-cash-register-transfer-form.component';

@NgModule({
  declarations: [HomeComponent, NewTransactionFormComponent, NewCashRegisterTransferFormComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule],
})
export default class HomeModule {}
