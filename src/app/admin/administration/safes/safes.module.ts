import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafesRoutingModule } from './safes-routing.module';
import { SafesComponent } from './safes.component';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpdateBaseModalComponent } from './components/update-base-modal/update-base-modal.component';
import { UpdateBaseFormComponent } from './components/update-base-form/update-base-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import AdmItemCardComponent from '../administration.module';

@NgModule({
  declarations: [
    SafesComponent,
    UpdateBaseModalComponent,
    UpdateBaseFormComponent,
  ],
  imports: [
    CommonModule,
    SafesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AdmItemCardComponent,
  ],
})
export default class SafesModule {}
