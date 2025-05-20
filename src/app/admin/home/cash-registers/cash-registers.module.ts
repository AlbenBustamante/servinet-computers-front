import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NewCashRegisterFormComponent } from './components/new-cash-register-form/new-cash-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CashRegistersTableComponent } from './components/cash-registers-table/cash-registers-table.component';
import { UpdateCashRegisterFormComponent } from './components/update-cash-register-form/update-cash-register-form.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    NewCashRegisterFormComponent,
    CashRegistersTableComponent,
    UpdateCashRegisterFormComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    CashRegistersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class CashRegistersModule {}
