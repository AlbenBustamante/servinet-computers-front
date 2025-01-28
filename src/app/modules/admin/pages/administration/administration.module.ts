import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdmItemCardComponent } from './components/adm-item-card/adm-item-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AdministrationComponent, AdmItemCardComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [AdmItemCardComponent],
})
export default class AdministrationModule {}
