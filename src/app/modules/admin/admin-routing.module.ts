import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./pages/home/home.module') },
      {
        path: 'panel',
        loadChildren: () => import('./pages/dashboard/dashboard.module'),
      },
      {
        path: 'plataformas',
        loadChildren: () => import('./pages/platforms/platforms.module'),
      },
      {
        path: 'cajas-registradoras',
        loadChildren: () =>
          import('./pages/cash-registers/cash-registers.module'),
      },
      {
        path: 'cajas-fuertes',
        loadChildren: () => import('./pages/safes/safes.module'),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/users/users.module'),
      },
      {
        path: 'administracion',
        loadChildren: () =>
          import('./pages/administration/administration.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
