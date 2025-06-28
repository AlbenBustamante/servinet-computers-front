import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [AdministrationComponent, ProductCardComponent],
  imports: [CommonModule, AdministrationRoutingModule, SharedModule, FontAwesomeModule],
})
export default class AdministrationModule {}
