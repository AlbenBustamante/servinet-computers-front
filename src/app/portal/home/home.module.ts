import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeNavItemComponent } from './components/home-nav-item/home-nav-item.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';

@NgModule({
  declarations: [
    AboutMeComponent,
    LayoutComponent,
    HomeNavItemComponent,
    HomeNavComponent
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export default class HomeModule {}
