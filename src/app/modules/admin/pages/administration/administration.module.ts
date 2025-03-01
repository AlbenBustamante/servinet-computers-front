import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdmItemCardComponent } from './components/adm-item-card/adm-item-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdmBaseCalculatorComponent } from './components/adm-base-calculator/adm-base-calculator.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdministrationComponent,
    AdmItemCardComponent,
    AdmBaseCalculatorComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [AdmItemCardComponent, AdmBaseCalculatorComponent],
})
export default class AdministrationModule {}
