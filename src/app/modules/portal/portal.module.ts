import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, PortalRoutingModule, SharedModule],
})
export class PortalModule {}
