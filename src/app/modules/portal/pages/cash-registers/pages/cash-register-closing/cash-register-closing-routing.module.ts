import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterClosingComponent } from './cash-register-closing.component';

const routes: Routes = [
  {
    path: '',
    component: CashRegisterClosingComponent,
    children: [
      {
        path: 'base-final',
        loadChildren: () => import('./final-base/final-base.module'),
      },
      {
        path: 'reporte-final',
        loadChildren: () => import('./final-report/final-report.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegisterClosingRoutingModule {}
