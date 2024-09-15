import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRegisterDetailsRoutingModule } from './my-cash-register-details-routing.module';
import { MyCashRegisterDetailsComponent } from './my-cash-register-details.component';

@NgModule({
  declarations: [MyCashRegisterDetailsComponent],
  imports: [CommonModule, MyCashRegisterDetailsRoutingModule],
})
export default class MyCashRegisterDetailsModule {}
