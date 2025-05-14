import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestChangePasswordFormComponent } from './components/request-change-password-form/request-change-password-form.component';
import { PasswordTempCodeFormComponent } from './password-temp-code-form/password-temp-code-form.component';

@NgModule({
  declarations: [ChangePasswordComponent, RequestChangePasswordFormComponent, PasswordTempCodeFormComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class ChangePasswordModule {}
