import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  {
    path: 'plataformas',
    loadChildren: () => import('./platforms/platforms.module'),
  },
  {
    path: 'cajas-registradoras',
    loadChildren: () => import('./cash-registers/cash-registers.module'),
  },
  {
    path: 'cajas-fuertes',
    loadChildren: () => import('./safes/safes.module'),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./users/users.module'),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
