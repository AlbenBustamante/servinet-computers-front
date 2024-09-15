import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCashRegistersComponent } from './my-cash-registers.component';

const routes: Routes = [
  {
    path: '',
    component: MyCashRegistersComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./my-cash-registers-list/my-cash-registers-list.module'),
      },
      {
        path: 'detalles',
        loadChildren: () =>
          import('./my-cash-register-details/my-cash-register-details.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCashRegistersRoutingModule {}
