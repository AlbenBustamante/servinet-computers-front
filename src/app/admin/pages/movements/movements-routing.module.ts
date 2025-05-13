import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './movements.component';

const routes: Routes = [
  { path: '', component: MovementsComponent },
  {
    path: 'caja-registradora/:id',
    loadChildren: () =>
      import('./pages/cash-register-movements/cash-register-movements.module'),
  },
  {
    path: 'caja-fuerte/:id',
    loadChildren: () => import('./pages/safe-movements/safe-movements.module'),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementsRoutingModule {}
