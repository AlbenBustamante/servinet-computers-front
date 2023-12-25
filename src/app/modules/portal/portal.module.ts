import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PortalModule {}
