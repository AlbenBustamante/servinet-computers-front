import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { PortalComponent } from './pages/portal/portal.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    RegisterComponent,
    PortalComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
