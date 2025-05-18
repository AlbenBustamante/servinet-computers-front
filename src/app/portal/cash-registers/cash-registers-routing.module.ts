import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegistersComponent } from './cash-registers.component';

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
        loadChildren: () =>
          import('./available-cash-registers/available-cash-registers.module'),
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
