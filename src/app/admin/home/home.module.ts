import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [HomeComponent, ProductCardComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, FontAwesomeModule],
})
export default class HomeModule {}
