import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlatformFormComponent } from './components/new-platform-form/new-platform-form.component';
import { PlatformsTableComponent } from './components/platforms-table/platforms-table.component';
import { UpdatePlatformFormComponent } from './components/update-platform-form/update-platform-form.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { UpdateBalancesModalComponent } from './components/update-balances-modal/update-balances-modal.component';
import { PlatformDetailsBalancesComponent } from './components/platform-details-balances/platform-details-balances.component';
import { PlatformDetailsQuickActionsComponent } from './components/platform-details-quick-actions/platform-details-quick-actions.component';
import { NewPlatformTransferModalComponent } from './components/new-platform-transfer-modal/new-platform-transfer-modal.component';
import { TransfersTableComponent } from './components/transfers-table/transfers-table.component';
import { HomeSharedModule } from '../home-shared/home-shared.module';

@NgModule({
  declarations: [
    NewPlatformFormComponent,
    PlatformsTableComponent,
    UpdatePlatformFormComponent,
    ListComponent,
    DetailsComponent,
    UpdateBalancesModalComponent,
    PlatformDetailsBalancesComponent,
    PlatformDetailsQuickActionsComponent,
    NewPlatformTransferModalComponent,
    TransfersTableComponent,
  ],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HomeSharedModule,
  ],
})
export default class PlatformsModule {}
