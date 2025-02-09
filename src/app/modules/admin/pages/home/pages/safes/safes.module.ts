import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafesRoutingModule } from './safes-routing.module';
import { SafesComponent } from './safes.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewSafeFormComponent } from './components/new-safe-form/new-safe-form.component';
import { SafesTableComponent } from './components/safes-table/safes-table.component';

@NgModule({
  declarations: [SafesComponent, NewSafeFormComponent, SafesTableComponent],
  imports: [
    CommonModule,
    SafesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class SafesModule {}
