import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { NewTransferFormComponent } from './components/new-transfer-form/new-transfer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvailablePlatformsComponent } from './components/available-platforms/available-platforms.component';
import { TransfersComponent } from './components/transfers/transfers.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewTransferFormComponent,
    AvailablePlatformsComponent,
    TransfersComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule],
})
export class HomeModule {}
