import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeMovementsRoutingModule } from './safe-movements-routing.module';
import { SafeMovementsComponent } from './safe-movements.component';

@NgModule({
  declarations: [SafeMovementsComponent],
  imports: [CommonModule, SafeMovementsRoutingModule],
})
export default class SafeMovementsModule {}
