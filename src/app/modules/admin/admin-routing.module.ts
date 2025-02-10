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
        path: 'administracion',
        loadChildren: () =>
          import('./pages/administration/administration.module'),
      },
      {
        path: 'movimientos',
        loadChildren: () => import('./pages/movements/movements.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
