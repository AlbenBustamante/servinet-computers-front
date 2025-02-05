import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdmItemCardComponent } from './components/adm-item-card/adm-item-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CashRegisterStatusPipe } from 'app/core/pipes/cash-register-status.pipe';

@NgModule({
  declarations: [AdministrationComponent, AdmItemCardComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    RouterModule,
    FontAwesomeModule,
    CashRegisterStatusPipe,
  ],
  exports: [AdmItemCardComponent],
})
export default class AdministrationModule {}
