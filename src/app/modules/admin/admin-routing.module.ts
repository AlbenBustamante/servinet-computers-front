import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { redirectGuard } from '@guards/redirect.guard';
import { tokenGuard } from '@guards/token.guard';
import { AuthToken } from '@models/enums';
import { AdminComponent } from './admin.component';

const loginPath: string = '/admin/login';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.USER)],
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'platforms',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.USER)],
        loadChildren: () =>
          import('./pages/platforms/platforms.module').then(
            (m) => m.PlatformsModule
          ),
      },
      {
        path: 'campuses',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.USER)],
        loadChildren: () =>
          import('./pages/campuses/campuses.module').then(
            (m) => m.CampusesModule
          ),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [redirectGuard('/admin/')],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
