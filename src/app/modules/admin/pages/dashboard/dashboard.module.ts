import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CampusesListComponent } from './components/campuses-list/campuses-list.component';
import { StatsComponent } from './components/stats/stats.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, CampusesListComponent, StatsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
