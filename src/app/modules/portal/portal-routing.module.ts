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
        path: 'mi-caja',
        loadChildren: () => import('./pages/my-cash/my-cash.module'),
      },
      {
        path: 'plataformas',
        loadChildren: () => import('./pages/platforms/platforms.module'),
      },
      {
        path: 'transacciones',
        loadChildren: () => import('./pages/transactions/transactions.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
