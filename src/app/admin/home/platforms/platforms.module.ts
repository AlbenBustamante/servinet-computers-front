import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlatformFormComponent } from './components/new-platform-form/new-platform-form.component';
import { PlatformsTableComponent } from './components/platforms-table/platforms-table.component';
import { UpdatePlatformFormComponent } from './components/update-platform-form/update-platform-form.component';
import { PlatformsListComponent } from './platforms-list/platforms-list.component';
import { PlatformDetailsComponent } from './platform-details/platform-details.component';
import { PlatformDetailBalanceComponent } from './components/platform-detail-balance/platform-detail-balance.component';
import { UpdateBalancesModalComponent } from './components/update-balances-modal/update-balances-modal.component';
import { PlatformDetailsBalancesComponent } from './components/platform-details-balances/platform-details-balances.component';
import { PlatformDetailsQuickActionsComponent } from './components/platform-details-quick-actions/platform-details-quick-actions.component';

@NgModule({
  declarations: [
    NewPlatformFormComponent,
    PlatformsTableComponent,
    UpdatePlatformFormComponent,
    PlatformsListComponent,
    PlatformDetailsComponent,
    PlatformDetailBalanceComponent,
    UpdateBalancesModalComponent,
    PlatformDetailsBalancesComponent,
    PlatformDetailsQuickActionsComponent,
  ],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class PlatformsModule {}
