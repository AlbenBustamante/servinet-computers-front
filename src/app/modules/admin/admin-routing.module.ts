import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlatformsComponent } from './pages/platforms/platforms.component';
import { CampusesComponent } from './pages/campuses/campuses.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { redirectGuard } from 'src/app/core/guards/redirect.guard';
import { tokenGuard } from 'src/app/core/guards/token.guard';
import { AuthToken } from 'src/app/core/models/enums';

const loginPath: string = '/admin/login';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectGuard('/admin/')],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard(loginPath), tokenGuard(AuthToken.USER)],
  },
  {
    path: 'platforms',
    component: PlatformsComponent,
    canActivate: [authGuard(loginPath), tokenGuard(AuthToken.USER)],
  },
  {
    path: 'campuses',
    component: CampusesComponent,
    canActivate: [authGuard(loginPath), tokenGuard(AuthToken.USER)],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
