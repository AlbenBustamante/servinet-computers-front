import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryTimeRoutingModule } from './entry-time-routing.module';
import { EntryTimeComponent } from './entry-time.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InitialWorkingFormComponent } from './components/initial-working-form/initial-working-form.component';

@NgModule({
  declarations: [EntryTimeComponent, InitialWorkingFormComponent],
  imports: [
    CommonModule,
    EntryTimeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class EntryTimeModule {}
