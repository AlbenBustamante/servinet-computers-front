import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryTimeRoutingModule } from './entry-time-routing.module';
import { EntryTimeComponent } from './entry-time.component';

@NgModule({
  declarations: [EntryTimeComponent],
  imports: [CommonModule, EntryTimeRoutingModule],
})
export default class EntryTimeModule {}
