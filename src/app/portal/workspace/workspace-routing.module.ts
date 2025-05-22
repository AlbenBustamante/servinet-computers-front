import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      { path: '', redirectTo: 'transacciones', pathMatch: 'full' },
      {
        path: 'transacciones',
        loadChildren: () => import('./transactions/transactions.module'),
      },
      {
        path: 'gastos',
        loadChildren: () => import('./expenses/expenses.module'),
      },
      {
        path: 'transferencias',
        loadChildren: () => import('./transfers/transfers.module'),
      },
      {
        path: 'depositos-bancarios',
        loadChildren: () => import('./bank-deposits/bank-deposits.module'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
