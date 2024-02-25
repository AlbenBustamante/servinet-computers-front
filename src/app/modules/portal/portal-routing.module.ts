import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { authGuard } from '@guards/auth.guard';
import { tokenGuard } from '@guards/token.guard';
import { AuthToken } from '@models/enums';
import { redirectGuard } from '@guards/redirect.guard';

const loginPath: string = '/portal/login';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.CAMPUS)],
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'transfers',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.CAMPUS)],
        loadChildren: () =>
          import('./pages/transfers/transfers.module').then(
            (m) => m.TransfersModule
          ),
      },
      {
        path: 'balances',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.CAMPUS)],
        loadChildren: () =>
          import('./pages/balances/balances.module').then(
            (m) => m.BalancesModule
          ),
      },
      {
        path: 'reports',
        canActivate: [authGuard(loginPath), tokenGuard(AuthToken.CAMPUS)],
        loadChildren: () =>
          import('./pages/reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [redirectGuard('/portal/')],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
