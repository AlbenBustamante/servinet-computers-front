import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafesRoutingModule } from './safes-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewSafeFormComponent } from './components/new-safe-form/new-safe-form.component';
import { SafesTableComponent } from './components/safes-table/safes-table.component';
import { ListComponent } from './list/list.component';
import { HomeSharedModule } from '../home-shared/home-shared.module';

@NgModule({
  declarations: [NewSafeFormComponent, SafesTableComponent, ListComponent],
  imports: [
    CommonModule,
    SafesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HomeSharedModule,
  ],
})
export default class SafesModule {}
