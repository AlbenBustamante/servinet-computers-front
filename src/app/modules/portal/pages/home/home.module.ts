import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTransactionFormComponent } from './components/new-transaction-form/new-transaction-form.component';

@NgModule({
  declarations: [HomeComponent, NewTransactionFormComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule],
})
export default class HomeModule {}
