import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegistersRoutingModule } from './cash-registers-routing.module';
import { CashRegistersComponent } from './cash-registers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import AdmItemCardComponent from '../administration.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CashRegistersComponent],
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
