import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NewCashRegisterFormComponent } from './list/components/new-cash-register-form/new-cash-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CashRegistersTableComponent } from './list/components/cash-registers-table/cash-registers-table.component';
import { UpdateCashRegisterFormComponent } from './list/components/update-cash-register-form/update-cash-register-form.component';
import { ListComponent } from './list/list.component';
import { AdmSharedModule } from '@admin/administration/adm-shared/adm-shared.module';

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
    AdmSharedModule,
  ],
})
export default class CashRegistersModule {}
