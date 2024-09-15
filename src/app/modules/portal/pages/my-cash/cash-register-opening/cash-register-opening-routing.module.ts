import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterOpeningComponent } from './cash-register-opening.component';

const routes: Routes = [
  {
    path: '',
    component: CashRegisterOpeningComponent,
    children: [
      {
        path: 'hora-entrada',
        loadChildren: () => import('./entry-time/entry-time.module'),
      },
      {
        path: 'base',
        loadChildren: () => import('./base-cash/base-cash.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegisterOpeningRoutingModule {}
