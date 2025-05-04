import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'transacciones', pathMatch: 'full' },
      {
        path: 'transacciones',
        loadChildren: () => import('./pages/transactions/transactions.module'),
      },
      {
        path: 'gastos',
        loadChildren: () => import('./pages/expenses/expenses.module'),
      },
      {
        path: 'transferencias',
        loadChildren: () => import('./pages/transfers/transfers.module'),
      },
      {
        path: 'depositos-bancarios',
        loadChildren: () =>
          import('./pages/bank-deposits/bank-deposits.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
