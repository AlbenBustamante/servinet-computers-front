import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseCashRoutingModule } from './base-cash-routing.module';
import { BaseCashComponent } from './base-cash.component';

@NgModule({
  declarations: [BaseCashComponent],
  imports: [CommonModule, BaseCashRoutingModule],
})
export default class BaseCashModule {}
