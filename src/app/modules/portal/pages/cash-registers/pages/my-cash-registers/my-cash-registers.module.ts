import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCashRegistersRoutingModule } from './my-cash-registers-routing.module';
import { MyCashRegistersComponent } from './my-cash-registers.component';
import { SharedModule } from '@shared/shared.module';
import { MyStatsHeaderComponent } from './components/my-stats-header/my-stats-header.component';
import { MyHourStatHeaderComponent } from './components/my-hour-stat-header/my-hour-stat-header.component';
import { MyValueStatHeaderCardComponent } from './components/my-value-stat-header-card/my-value-stat-header-card.component';
import { MyMainStatsHeaderComponent } from './components/my-main-stats-header/my-main-stats-header.component';
import { MyActionsFooterComponent } from './components/my-actions-footer/my-actions-footer.component';

@NgModule({
  declarations: [MyCashRegistersComponent, MyStatsHeaderComponent, MyHourStatHeaderComponent, MyValueStatHeaderCardComponent, MyMainStatsHeaderComponent, MyActionsFooterComponent],
  imports: [CommonModule, MyCashRegistersRoutingModule, SharedModule],
})
export default class MyCashRegistersModule {}
