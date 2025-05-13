import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'cajas-fuertes', pathMatch: 'full' },
      {
        path: 'cajas-fuertes',
        loadChildren: () => import('./pages/safes/safes.module'),
      },
      {
        path: 'cajas-registradoras',
        loadChildren: () =>
          import('./pages/cash-registers/cash-registers.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
