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
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesTableComponent } from './expenses/components/expenses-table/expenses-table.component';
import { NewExpenseFormComponent } from './expenses/components/new-expense-form/new-expense-form.component';
import { UpdateExpenseFormComponent } from './expenses/components/update-expense-form/update-expense-form.component';
import { TransfersComponent } from './transfers/transfers.component';
import { CashTransfersTableComponent } from './transfers/components/cash-transfers-table/cash-transfers-table.component';
import { NewCashTransferFormComponent } from './transfers/components/new-cash-transfer-form/new-cash-transfer-form.component';
import { BankDepositsComponent } from './bank-deposits/bank-deposits.component';
import { BankDepositInfoListComponent } from './bank-deposits/components/bank-deposit-info-list/bank-deposit-info-list.component';
import { BankDepositItemComponent } from './bank-deposits/components/bank-deposit-item/bank-deposit-item.component';
import { NewBankDepositFormComponent } from './bank-deposits/components/new-bank-deposit-form/new-bank-deposit-form.component';
import { NewBankDepositPaymentFormComponent } from './bank-deposits/components/new-bank-deposit-payment-form/new-bank-deposit-payment-form.component';
import { NewDepositorFormComponent } from './bank-deposits/components/new-depositor-form/new-depositor-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WorkspaceSubtitleComponent } from './components/workspace-subtitle/workspace-subtitle.component';
import { ItemParagraphComponent } from './bank-deposits/components/item-paragraph/item-paragraph.component';

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
    ExpensesComponent,
    ExpensesTableComponent,
    NewExpenseFormComponent,
    UpdateExpenseFormComponent,
    TransfersComponent,
    CashTransfersTableComponent,
    NewCashTransferFormComponent,
    BankDepositsComponent,
    BankDepositInfoListComponent,
    BankDepositItemComponent,
    NewBankDepositFormComponent,
    NewBankDepositPaymentFormComponent,
    NewDepositorFormComponent,
    WorkspaceSubtitleComponent,
    ItemParagraphComponent,
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [WorkspaceTableSectionComponent],
})
export default class WorkspaceModule {}
