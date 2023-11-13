import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { CampusesComponent } from './components/campuses/campuses.component';
import { PlatformsComponent } from './pages/platforms/platforms.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    StatsComponent,
    CampusesComponent,
    PlatformsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, RouterModule],
})
export class AdminModule {}
