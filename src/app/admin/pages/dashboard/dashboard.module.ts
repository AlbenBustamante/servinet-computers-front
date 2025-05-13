import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { PlatformsStatsTableComponent } from './components/platforms-stats-table/platforms-stats-table.component';
import { SafesStatsTableComponent } from './components/safes-stats-table/safes-stats-table.component';
import { CashBoxStatsComponent } from './components/cash-box-stats/cash-box-stats.component';
import { PlatformsModalComponent } from './components/platforms-modal/platforms-modal.component';
import { CashRegistersStatsTableComponent } from './components/cash-registers-stats-table/cash-registers-stats-table.component';
import { CashRegistersModalComponent } from './components/cash-registers-modal/cash-registers-modal.component';
import { SafesStatsModalComponent } from './components/safes-stats-modal/safes-stats-modal.component';
import { HeaderStatCardComponent } from './components/header-stat-card/header-stat-card.component';
import { CashBoxStatCardComponent } from './components/cash-box-stat-card/cash-box-stat-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderStatsComponent,
    PlatformsStatsTableComponent,
    SafesStatsTableComponent,
    CashBoxStatsComponent,
    PlatformsModalComponent,
    CashRegistersStatsTableComponent,
    CashRegistersModalComponent,
    SafesStatsModalComponent,
    HeaderStatCardComponent,
    CashBoxStatCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, FormsModule],
})
export default class DashboardModule {}
