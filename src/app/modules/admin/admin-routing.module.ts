import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module') },
      {
        path: 'panel',
        loadChildren: () => import('./pages/dashboard/dashboard.module'),
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
