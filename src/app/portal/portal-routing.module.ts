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
        loadChildren: () => import('./home/home.module'),
      },
      {
        path: 'trabajo',
        loadChildren: () => import('./workspace/workspace.module'),
      },
      {
        path: 'cajas',
        loadChildren: () => import('./cash-registers/cash-registers.module'),
      },
      {
        path: 'plataformas',
        loadChildren: () => import('./platforms/platforms.module'),
      },
      {
        path: 'reportes',
        loadChildren: () => import('./reports/reports.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
