import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDepositsComponent } from './bank-deposits.component';

const routes: Routes = [{ path: '', component: BankDepositsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankDepositsRoutingModule {}
