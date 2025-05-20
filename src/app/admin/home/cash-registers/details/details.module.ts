import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '@shared/shared.module';
import { HomeSharedModule } from '@admin/home/home-shared/home-shared.module';
import { HoursStatsComponent } from './components/hours-stats/hours-stats.component';
import { BaseComponent } from './components/base/base.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';

@NgModule({
  declarations: [SummaryComponent, HoursStatsComponent, BaseComponent, QuickActionsComponent],
  imports: [CommonModule, DetailsRoutingModule, SharedModule, HomeSharedModule],
})
export default class DetailsModule {}
