import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRoutingModule } from './my-cash-routing.module';
import { MyCashComponent } from './my-cash.component';
import { SharedModule } from '@shared/shared.module';
import { CashRegisterStatusPipe } from 'app/core/pipes/cash-register-status.pipe';
import { CashRegisterCardComponent } from './components/cash-register-card/cash-register-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseCalculatorFormComponent } from './components/base-calculator-form/base-calculator-form.component';
import { InitialWorkingFormComponent } from './components/initial-working-form/initial-working-form.component';
import { BaseObservationFormComponent } from './components/base-observation-form/base-observation-form.component';

@NgModule({
  declarations: [
    MyCashComponent,
    CashRegisterCardComponent,
    BaseCalculatorFormComponent,
    InitialWorkingFormComponent,
    BaseObservationFormComponent,
  ],
  imports: [
    CommonModule,
    MyCashRoutingModule,
    SharedModule,
    CashRegisterStatusPipe,
    ReactiveFormsModule,
  ],
})
export default class MyCashModule {}
