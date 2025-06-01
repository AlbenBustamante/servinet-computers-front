import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeNavItemComponent } from './components/home-nav-item/home-nav-item.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { JourneysComponent } from './journeys/journeys.component';
import { JourneysTableComponent } from './journeys/components/journeys-table/journeys-table.component';
import { SharedModule } from '@shared/shared.module';
import { HomeSubtitleComponent } from './components/home-subtitle/home-subtitle.component';
import { JourneyStatComponent } from './journeys/components/journey-stat/journey-stat.component';
import { JourneyStatsComponent } from './journeys/components/journey-stats/journey-stats.component';
import { AboutMeStatComponent } from './about-me/components/about-me-stat/about-me-stat.component';

@NgModule({
  declarations: [
    AboutMeComponent,
    LayoutComponent,
    HomeNavItemComponent,
    HomeNavComponent,
    JourneysComponent,
    JourneysTableComponent,
    HomeSubtitleComponent,
    JourneyStatComponent,
    JourneyStatsComponent,
    AboutMeStatComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export default class HomeModule {}
