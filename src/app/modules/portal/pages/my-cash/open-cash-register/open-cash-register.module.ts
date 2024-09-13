import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenCashRegisterRoutingModule } from './open-cash-register-routing.module';
import { OpenCashRegisterComponent } from './open-cash-register.component';

@NgModule({
  declarations: [OpenCashRegisterComponent],
  imports: [CommonModule, OpenCashRegisterRoutingModule],
})
export default class OpenCashRegisterModule {}
