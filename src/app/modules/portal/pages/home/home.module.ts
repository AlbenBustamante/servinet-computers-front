import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeNavComponent } from './components/home-nav/home-nav.component';

@NgModule({
  declarations: [HomeComponent, HomeNavComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, RouterModule],
})
export default class HomeModule {}
