import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PlatformsComponent } from './platforms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlatformFormComponent } from './components/new-platform-form/new-platform-form.component';
import { PlatformsTableComponent } from './components/platforms-table/platforms-table.component';
import { UpdatePlatformFormComponent } from './components/update-platform-form/update-platform-form.component';

@NgModule({
  declarations: [
    PlatformsComponent,
    NewPlatformFormComponent,
    PlatformsTableComponent,
    UpdatePlatformFormComponent,
  ],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class PlatformsModule {}
