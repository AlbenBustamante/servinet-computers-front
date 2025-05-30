import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { PlatformsComponent } from './platforms.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePlatformBalancesFormComponent } from './components/update-platform-balances-form/update-platform-balances-form.component';
import { PlatformBalanceInfoComponent } from './components/platform-balance-info/platform-balance-info.component';
import { PlatformBalanceListComponent } from './components/platform-balance-list/platform-balance-list.component';
import { NewPlatformTransferFormComponent } from './components/new-platform-transfer-form/new-platform-transfer-form.component';
import { BalanceStatComponent } from './components/balance-stat/balance-stat.component';

@NgModule({
  declarations: [PlatformsComponent, UpdatePlatformBalancesFormComponent, PlatformBalanceInfoComponent, PlatformBalanceListComponent, NewPlatformTransferFormComponent, BalanceStatComponent],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class PlatformsModule {}
