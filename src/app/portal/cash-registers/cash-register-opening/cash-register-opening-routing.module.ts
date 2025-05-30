import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterOpeningComponent } from './cash-register-opening.component';
import { EntryTimeComponent } from './entry-time/entry-time.component';

const routes: Routes = [
  {
    path: '',
    component: CashRegisterOpeningComponent,
    children: [
      {
        path: 'hora-entrada',
        component: EntryTimeComponent,
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
