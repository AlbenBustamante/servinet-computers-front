import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { MainStatsComponent } from './components/main-stats/main-stats.component';
import { PlatformsStatsTableComponent } from './components/platforms-stats-table/platforms-stats-table.component';
import { CashRegistersStatsComponent } from './components/cash-registers-stats/cash-registers-stats.component';
import { SafesStatsComponent } from './components/safes-stats/safes-stats.component';
import { SecondaryStatsComponent } from './components/secondary-stats/secondary-stats.component';
import { PlatformsModalComponent } from './components/platforms-modal/platforms-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainStatsComponent,
    PlatformsStatsTableComponent,
    CashRegistersStatsComponent,
    SafesStatsComponent,
    SecondaryStatsComponent,
    PlatformsModalComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export default class DashboardModule {}
