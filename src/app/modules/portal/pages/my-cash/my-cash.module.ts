import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRoutingModule } from './my-cash-routing.module';
import { MyCashComponent } from './my-cash.component';

@NgModule({
  declarations: [
    MyCashComponent
  ],
  imports: [CommonModule, MyCashRoutingModule],
})
export default class MyCashModule {}
