import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export default class HomeModule {}
