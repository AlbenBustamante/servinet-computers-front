import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeNavItemComponent } from './components/home-nav-item/home-nav-item.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { JourneysComponent } from './journeys/journeys.component';
import { JourneysTableComponent } from './components/journeys-table/journeys-table.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AboutMeComponent,
    LayoutComponent,
    HomeNavItemComponent,
    HomeNavComponent,
    JourneysComponent,
    JourneysTableComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export default class HomeModule {}
