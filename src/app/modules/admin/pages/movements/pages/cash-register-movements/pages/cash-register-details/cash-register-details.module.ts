import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterDetailsRoutingModule } from './cash-register-details-routing.module';
import { CashRegisterDetailsComponent } from './cash-register-details.component';
import { SharedModule } from '@shared/shared.module';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';

@NgModule({
  declarations: [CashRegisterDetailsComponent, StatCardComponent, HeaderStatsComponent],
  imports: [CommonModule, CashRegisterDetailsRoutingModule, SharedModule],
})
export default class CashRegisterDetailsModule {}
