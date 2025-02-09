import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegistersComponent } from './cash-registers.component';

const routes: Routes = [
  { path: '', component: CashRegistersComponent },
  {
    path: ':id/movimientos',
    loadChildren: () =>
      import('./pages/cash-register-movements/cash-register-movements.module'),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegistersRoutingModule {}
