import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { MainStatsComponent } from './components/main-stats/main-stats.component';
import { PlatformsStatsTableComponent } from './components/platforms-stats-table/platforms-stats-table.component';
import { SafesStatsTableComponent } from './components/safes-stats-table/safes-stats-table.component';
import { SecondaryStatsComponent } from './components/secondary-stats/secondary-stats.component';
import { PlatformsModalComponent } from './components/platforms-modal/platforms-modal.component';
import { CashRegistersStatsTableComponent } from './components/cash-registers-stats-table/cash-registers-stats-table.component';
import { CashRegistersModalComponent } from './components/cash-registers-modal/cash-registers-modal.component';
import { CashRegisterStatusPipe } from 'app/core/pipes/cash-register-status.pipe';
import { SafesStatsModalComponent } from './components/safes-stats-modal/safes-stats-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainStatsComponent,
    PlatformsStatsTableComponent,
    SafesStatsTableComponent,
    SecondaryStatsComponent,
    PlatformsModalComponent,
    CashRegistersStatsTableComponent,
    CashRegistersModalComponent,
    SafesStatsModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CashRegisterStatusPipe,
  ],
})
export default class DashboardModule {}
