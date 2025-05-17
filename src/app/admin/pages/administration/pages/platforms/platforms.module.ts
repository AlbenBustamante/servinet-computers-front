import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { PlatformsComponent } from './platforms.component';

@NgModule({
  declarations: [PlatformsComponent],
  imports: [CommonModule, PlatformsRoutingModule],
})
export default class PlatformsModule {}
