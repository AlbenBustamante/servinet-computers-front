import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegistersComponent } from './cash-registers.component';
import { AvailableCashRegistersComponent } from './available-cash-registers/available-cash-registers.component';

const routes: Routes = [
  {
    path: '',
    component: CashRegistersComponent,
    children: [
      {
        path: 'mis-cajas',
        loadChildren: () =>
          import('./my-cash-registers/my-cash-registers.module'),
      },
      {
        path: 'seleccion',
        component: AvailableCashRegistersComponent,
      },
      {
        path: 'apertura',
        loadChildren: () =>
          import('./cash-register-opening/cash-register-opening.module'),
      },
      {
        path: 'cierre',
        loadChildren: () =>
          import('./cash-register-closing/cash-register-closing.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegistersRoutingModule {}
