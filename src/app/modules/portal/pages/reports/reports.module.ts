import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionDetailTypePipe } from 'app/core/pipes/transaction-detail-type.pipe';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TransactionDetailTypePipe,
  ],
})
export default class ReportsModule {}
