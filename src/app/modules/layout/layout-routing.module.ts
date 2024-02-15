import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'transfers',
        loadChildren: () =>
          import('../transfers/transfers.module').then(
            (m) => m.TransfersModule
          ),
      },
      {
        path: 'balances',
        loadChildren: () =>
          import('../balances/balances.module').then((m) => m.BalancesModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
