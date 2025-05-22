import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { TransfersComponent } from './transfers.component';
import { NewCashTransferFormComponent } from './components/new-cash-transfer-form/new-cash-transfer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CashTransfersTableComponent } from './components/cash-transfers-table/cash-transfers-table.component';
import HomeTableSectionComponent from '@portal/workspace/workspace.module';

@NgModule({
  declarations: [
    TransfersComponent,
    NewCashTransferFormComponent,
    CashTransfersTableComponent,
  ],
  imports: [
    CommonModule,
    TransfersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HomeTableSectionComponent,
  ],
})
export default class TransfersModule {}
