import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeMovementsRoutingModule } from './safe-movements-routing.module';
import { SafeMovementsComponent } from './safe-movements.component';
import { SharedModule } from '@shared/shared.module';
import { SafeMovementsModalComponent } from './components/safe-movements-modal/safe-movements-modal.component';

@NgModule({
  declarations: [SafeMovementsComponent, SafeMovementsModalComponent],
  imports: [CommonModule, SafeMovementsRoutingModule, SharedModule],
})
export default class SafeMovementsModule {}
