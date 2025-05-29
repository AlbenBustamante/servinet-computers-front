import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { WorkspaceNavComponent } from './components/workspace-nav/workspace-nav.component';
import { WorkspaceTableSectionComponent } from './components/workspace-table-section/workspace-table-section.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NewTransactionFormComponent } from './transactions/components/new-transaction-form/new-transaction-form.component';
import { TransactionsTableComponent } from './transactions/components/transactions-table/transactions-table.component';
import { UpdateTransactionDetailFormComponent } from './transactions/components/update-transaction-detail-form/update-transaction-detail-form.component';
import { WorkspaceContainerComponent } from './components/workspace-container/workspace-container.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceNavComponent,
    WorkspaceTableSectionComponent,
    TransactionsComponent,
    NewTransactionFormComponent,
    TransactionsTableComponent,
    UpdateTransactionDetailFormComponent,
    WorkspaceContainerComponent,
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [WorkspaceTableSectionComponent],
})
export default class WorkspaceModule {}
