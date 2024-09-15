import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      {
        path: 'panel',
        loadChildren: () => import('./pages/dashboard/dashboard.module'),
      },
      {
        path: 'plataformas',
        loadChildren: () => import('./pages/platforms/platforms.module'),
      },
      { path: 'cajas', loadChildren: () => import('./pages/cash/cash.module') },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/users/users.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
