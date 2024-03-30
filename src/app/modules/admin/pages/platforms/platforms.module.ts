import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PlatformsComponent } from './platforms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlatformsComponent],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class PlatformsModule {}
