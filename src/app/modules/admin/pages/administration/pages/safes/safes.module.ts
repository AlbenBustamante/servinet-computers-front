import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafesRoutingModule } from './safes-routing.module';
import { SafesComponent } from './safes.component';

@NgModule({
  declarations: [
    SafesComponent
  ],
  imports: [CommonModule, SafesRoutingModule],
})
export default class SafesModule {}
