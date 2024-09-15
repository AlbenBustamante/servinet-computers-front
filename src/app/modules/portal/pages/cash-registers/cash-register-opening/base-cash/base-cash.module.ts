import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCashRoutingModule } from './base-cash-routing.module';
import { BaseCashComponent } from './base-cash.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { BaseObservationFormComponent } from './components/base-observation-form/base-observation-form.component';

@NgModule({
  declarations: [BaseCashComponent, BaseFormComponent, BaseObservationFormComponent],
  imports: [
    CommonModule,
    BaseCashRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class BaseCashModule {}
