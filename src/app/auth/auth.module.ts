import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { RequestChangePasswordFormComponent } from './components/request-change-password-form/request-change-password-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LoginFormComponent,
    ChangePasswordComponent,
    ChangePasswordFormComponent,
    RequestChangePasswordFormComponent,
    AuthCardComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export default class AuthModule {}
