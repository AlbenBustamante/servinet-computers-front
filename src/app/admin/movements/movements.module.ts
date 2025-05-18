import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { RoundedSectionComponent } from './components/rounded-section/rounded-section.component';
import { MovementProductComponent } from './components/movement-product/movement-product.component';
import { MovementProductsListComponent } from './components/movement-products-list/movement-products-list.component';
import { MovementProductRegistryComponent } from './components/movement-product-registry/movement-product-registry.component';
import { MovementProductRegistriesListComponent } from './components/movement-product-registries-list/movement-product-registries-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MovementsComponent,
    RoundedSectionComponent,
    MovementProductComponent,
    MovementProductsListComponent,
    MovementProductRegistryComponent,
    MovementProductRegistriesListComponent,
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    FontAwesomeModule,
    SharedModule,
    RouterModule,
  ],
})
export default class MovementsModule {}
