import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRegistersListRoutingModule } from './my-cash-registers-list-routing.module';
import { MyCashRegistersListComponent } from './my-cash-registers-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MyCashRegistersListComponent],
  imports: [CommonModule, MyCashRegistersListRoutingModule, SharedModule],
})
export default class MyCashRegistersListModule {}
