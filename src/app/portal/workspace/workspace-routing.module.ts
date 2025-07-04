import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TransfersComponent } from './transfers/transfers.component';
import { BankDepositsComponent } from './bank-deposits/bank-deposits.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      { path: '', redirectTo: 'transacciones', pathMatch: 'full' },
      {
        path: 'transacciones',
        component: TransactionsComponent,
      },
      {
        path: 'gastos',
        component: ExpensesComponent,
      },
      {
        path: 'transferencias',
        component: TransfersComponent,
      },
      {
        path: 'depositos-bancarios',
        component: BankDepositsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
