import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterDetailsComponent } from './cash-register-details.component';

const routes: Routes = [{ path: '', component: CashRegisterDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegisterDetailsRoutingModule {}
