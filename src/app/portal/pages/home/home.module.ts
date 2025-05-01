import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { HomeTableSectionComponent } from './components/home-table-section/home-table-section.component';

@NgModule({
  declarations: [HomeComponent, HomeNavComponent, HomeTableSectionComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, RouterModule],
  exports: [HomeTableSectionComponent],
})
export default class HomeModule {}
