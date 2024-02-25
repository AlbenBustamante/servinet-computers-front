import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [NavbarComponent, AdminComponent],
  imports: [CommonModule, AdminRoutingModule, RouterModule, SharedModule],
})
export class AdminModule {}
