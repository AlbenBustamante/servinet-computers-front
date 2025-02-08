import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import AdmItemCardComponent from '../../administration.module';
import { UpdateCashRegisterBaseFormComponent } from './components/update-cash-register-base-form/update-cash-register-base-form.component';
import { UpdateCashRegisterBaseModalComponent } from './components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { SharedModule } from '@shared/shared.module';
import { FinalWorkingHourFormComponent } from './components/final-working-hour-form/final-working-hour-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CashRegistersComponent,
    UpdateCashRegisterBaseFormComponent,
    UpdateCashRegisterBaseModalComponent,
    FinalWorkingHourFormComponent,
  ],
  imports: [
    CommonModule,
    CashRegistersRoutingModule,
    FontAwesomeModule,
    AdmItemCardComponent,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class CashRegistersModule {}
