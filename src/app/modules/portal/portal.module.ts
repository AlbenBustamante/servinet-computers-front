import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { PortalRoutingModule } from './portal-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortalComponent } from './portal.component';

@NgModule({
  declarations: [PortalComponent, NavbarComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PortalModule {}
