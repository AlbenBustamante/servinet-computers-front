import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestChangePasswordFormComponent } from './components/request-change-password-form/request-change-password-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    RequestChangePasswordFormComponent,
    ChangePasswordFormComponent,
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class ChangePasswordModule {}
