import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlatformFormComponent } from './list/components/new-platform-form/new-platform-form.component';
import { PlatformsTableComponent } from './list/components/platforms-table/platforms-table.component';
import { UpdatePlatformFormComponent } from './list/components/update-platform-form/update-platform-form.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { PlatformDetailsQuickActionsComponent } from './details/components/platform-details-quick-actions/platform-details-quick-actions.component';
import { AdmSharedModule } from '@admin/administration/adm-shared/adm-shared.module';
import { PlatformDetailsBalancesComponent } from './details/components/platform-details-balances/platform-details-balances.component';
import { NewPlatformTransferModalComponent } from './details/components/new-platform-transfer-modal/new-platform-transfer-modal.component';
import { UpdateBalancesModalComponent } from './details/components/update-balances-modal/update-balances-modal.component';
import { TransfersTableComponent } from './details/components/transfers-table/transfers-table.component';

@NgModule({
  declarations: [
    NewPlatformFormComponent,
    PlatformsTableComponent,
    UpdatePlatformFormComponent,
    ListComponent,
    DetailsComponent,
    UpdateBalancesModalComponent,
    PlatformDetailsQuickActionsComponent,
    NewPlatformTransferModalComponent,
    TransfersTableComponent,
    PlatformDetailsBalancesComponent,
  ],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AdmSharedModule,
  ],
})
export default class PlatformsModule {}
