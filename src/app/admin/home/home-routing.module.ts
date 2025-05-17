import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
export class HomeRoutingModule {}
