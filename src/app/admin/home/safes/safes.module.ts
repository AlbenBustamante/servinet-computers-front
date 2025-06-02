import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafesRoutingModule } from './safes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewSafeFormComponent } from './components/new-safe-form/new-safe-form.component';
import { SafesTableComponent } from './components/safes-table/safes-table.component';
import { ListComponent } from './list/list.component';
import { HomeSharedModule } from '../home-shared/home-shared.module';
import { DetailsComponent } from './details/details.component';
import { DetailMainStatsComponent } from './components/detail-main-stats/detail-main-stats.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { TransferModalComponent } from './components/transfer-modal/transfer-modal.component';
import { UpdateBaseModalComponent } from './components/update-base-modal/update-base-modal.component';
import { BasesTableComponent } from './components/bases-table/bases-table.component';

@NgModule({
  declarations: [
    NewSafeFormComponent,
    SafesTableComponent,
    ListComponent,
    DetailsComponent,
    DetailMainStatsComponent,
    QuickActionsComponent,
    TransferModalComponent,
    UpdateBaseModalComponent,
    BasesTableComponent,
  ],
  imports: [
    CommonModule,
    SafesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HomeSharedModule,
  ],
})
export default class SafesModule {}
