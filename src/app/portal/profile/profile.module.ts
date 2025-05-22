import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [CommonModule, ProfileRoutingModule],
})
export default class ProfileModule {}
