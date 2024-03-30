import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampusesRoutingModule } from './campuses-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CampusesComponent } from './campuses.component';

@NgModule({
  declarations: [CampusesComponent],
  imports: [
    CommonModule,
    CampusesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class CampusesModule {}
