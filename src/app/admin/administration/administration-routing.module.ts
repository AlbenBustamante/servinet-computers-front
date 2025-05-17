import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'plataformas', pathMatch: 'full' },
      {
        path: 'cajas-fuertes',
        loadChildren: () => import('./safes/safes.module'),
      },
      {
        path: 'cajas-registradoras',
        loadChildren: () => import('./cash-registers/cash-registers.module'),
      },
      {
        path: 'plataformas',
        loadChildren: () => import('./platforms/platforms.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
