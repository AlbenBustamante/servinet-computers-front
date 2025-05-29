import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterOpeningRoutingModule } from './cash-register-opening-routing.module';
import { CashRegisterOpeningComponent } from './cash-register-opening.component';
import { EntryTimeComponent } from './entry-time/entry-time.component';
import { InitialWorkingFormComponent } from './entry-time/components/initial-working-form/initial-working-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CashRegisterOpeningComponent,
    EntryTimeComponent,
    InitialWorkingFormComponent,
  ],
  imports: [
    CommonModule,
    CashRegisterOpeningRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export default class CashRegisterOpeningModule {}
