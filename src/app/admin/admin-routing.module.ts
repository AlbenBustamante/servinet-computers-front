import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module') },
      {
        path: 'panel',
        loadChildren: () => import('./dashboard/dashboard.module'),
      },
      {
        path: 'administracion',
        loadChildren: () => import('./administration/administration.module'),
      },
      {
        path: 'movimientos',
        loadChildren: () => import('./movements/movements.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
