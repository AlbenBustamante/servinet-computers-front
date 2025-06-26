import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'administracion', pathMatch: 'full' },
      {
        path: 'panel',
        loadChildren: () => import('./dashboard/dashboard.module'),
      },
      {
        path: 'administracion',
        loadChildren: () => import('./administration/administration.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
