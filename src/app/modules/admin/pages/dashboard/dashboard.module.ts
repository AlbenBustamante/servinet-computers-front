import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { MainStatsComponent } from './components/main-stats/main-stats.component';
import { PlatformsStatsComponent } from './components/platforms-stats/platforms-stats.component';
import { CashRegistersStatsComponent } from './components/cash-registers-stats/cash-registers-stats.component';
import { SafesStatsComponent } from './components/safes-stats/safes-stats.component';

@NgModule({
  declarations: [DashboardComponent, MainStatsComponent, PlatformsStatsComponent, CashRegistersStatsComponent, SafesStatsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export default class DashboardModule {}
