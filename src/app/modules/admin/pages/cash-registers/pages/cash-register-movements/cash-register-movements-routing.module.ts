import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';

const routes: Routes = [
  { path: '', component: CashRegisterMovementsComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./pages/cash-register-details/cash-register-details.module'),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegisterMovementsRoutingModule {}
