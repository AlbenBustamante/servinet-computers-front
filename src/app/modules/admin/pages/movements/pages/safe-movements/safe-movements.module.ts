import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeMovementsRoutingModule } from './safe-movements-routing.module';
import { SafeMovementsComponent } from './safe-movements.component';
import { SharedModule } from '@shared/shared.module';
import { SafeMovementsModalComponent } from './components/safe-movements-modal/safe-movements-modal.component';
import { SafeMovementsTableComponent } from './components/safe-movements-table/safe-movements-table.component';

@NgModule({
  declarations: [
    SafeMovementsComponent,
    SafeMovementsModalComponent,
    SafeMovementsTableComponent,
  ],
  imports: [CommonModule, SafeMovementsRoutingModule, SharedModule],
})
export default class SafeMovementsModule {}
