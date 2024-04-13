import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';

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
        loadChildren: () => import('./pages/home/home.module'),
      },
      {
        path: 'my-cash',
        loadChildren: () => import('./pages/my-cash/my-cash.module'),
      },
      {
        path: 'transfers',
        loadChildren: () => import('./pages/transfers/transfers.module'),
      },
      {
        path: 'balances',
        loadChildren: () => import('./pages/balances/balances.module'),
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
