import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafesRoutingModule } from './safes-routing.module';
import { SafesComponent } from './safes.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdateBaseModalComponent } from './components/update-base-modal/update-base-modal.component';

@NgModule({
  declarations: [SafesComponent, UpdateBaseModalComponent],
  imports: [CommonModule, SafesRoutingModule, SharedModule, FontAwesomeModule],
})
export default class SafesModule {}
