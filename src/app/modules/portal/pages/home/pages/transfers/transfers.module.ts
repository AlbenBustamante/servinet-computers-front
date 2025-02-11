import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { TransfersComponent } from './transfers.component';
import { NewCashTransferFormComponent } from './components/new-cash-transfer-form/new-cash-transfer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TransfersComponent, NewCashTransferFormComponent],
  imports: [
    CommonModule,
    TransfersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export default class TransfersModule {}
