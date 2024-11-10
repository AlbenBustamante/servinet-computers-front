import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PlatformsComponent } from './platforms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlatformFormComponent } from './components/new-platform-form/new-platform-form.component';
import { PlatformsListComponent } from './components/platforms-list/platforms-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PlatformsComponent,
    NewPlatformFormComponent,
    PlatformsListComponent,
  ],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export default class PlatformsModule {}
