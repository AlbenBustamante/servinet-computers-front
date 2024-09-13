import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCashComponent } from './my-cash.component';

const routes: Routes = [
  {
    path: '',
    component: MyCashComponent,
    children: [
      {
        path: 'caja-abierta',
        loadChildren: () =>
          import('./open-cash-register/open-cash-register.module'),
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCashRoutingModule {}
