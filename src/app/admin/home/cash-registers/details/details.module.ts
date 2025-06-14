import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '@shared/shared.module';
import { HomeSharedModule } from '@admin/home/home-shared/home-shared.module';
import { HoursStatsComponent } from './components/hours-stats/hours-stats.component';
import { BaseStatsComponent } from './components/base-stats/base-stats.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { MovementsComponent } from './movements/movements.component';

@NgModule({
  declarations: [
    SummaryComponent,
    HoursStatsComponent,
    BaseStatsComponent,
    QuickActionsComponent,
    BasicInfoComponent,
    MovementsComponent,
  ],
  imports: [CommonModule, DetailsRoutingModule, SharedModule, HomeSharedModule],
})
export default class DetailsModule {}
