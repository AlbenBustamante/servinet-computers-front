import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { TransfersComponent } from './transfers.component';


@NgModule({
  declarations: [
    TransfersComponent
  ],
  imports: [
    CommonModule,
    TransfersRoutingModule
  ]
})
export class TransfersModule { }
