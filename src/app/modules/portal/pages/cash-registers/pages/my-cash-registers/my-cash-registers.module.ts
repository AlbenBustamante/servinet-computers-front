import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRegistersRoutingModule } from './my-cash-registers-routing.module';
import { MyCashRegistersComponent } from './my-cash-registers.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MyCashRegistersComponent],
  imports: [CommonModule, MyCashRegistersRoutingModule, SharedModule],
})
export default class MyCashRegistersModule {}
