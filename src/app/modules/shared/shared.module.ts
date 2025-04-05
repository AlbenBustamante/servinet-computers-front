import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { DynamicPipe } from '@shared/pipes/dynamic.pipe';
import { CashRegisterDetailStatusPipe } from './pipes/cash-register-detail-status.pipe';
import { CashRegisterStatusPipe } from './pipes/cash-register-status.pipe';
import { EnabledPipe } from './pipes/enabled.pipe';
import { RolePipe } from './pipes/role.pipe';
import { TransactionDetailTypePipe } from './pipes/transaction-detail-type.pipe';
import { DiscountPipe } from './pipes/discount.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TempCodeFormComponent } from './components/temp-code-form/temp-code-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeLogTypePipe } from './pipes/change-log-type.pipe';
import { ChangeLogActionPipe } from './pipes/change-log-action.pipe';

@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    HeaderTitleComponent,
    ButtonComponent,
    SpinnerComponent,
    IconButtonComponent,
    LoadingComponent,
    CustomTableComponent,
    DynamicPipe,
    CashRegisterDetailStatusPipe,
    CashRegisterStatusPipe,
    EnabledPipe,
    RolePipe,
    TransactionDetailTypePipe,
    DiscountPipe,
    SidebarComponent,
    TempCodeFormComponent,
    ChangeLogTypePipe,
    ChangeLogActionPipe,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    NavComponent,
    HeaderTitleComponent,
    ButtonComponent,
    IconButtonComponent,
    SpinnerComponent,
    LoadingComponent,
    CustomTableComponent,
    CashRegisterStatusPipe,
    CashRegisterDetailStatusPipe,
    SidebarComponent,
    TempCodeFormComponent,
  ],
})
export class SharedModule {}
