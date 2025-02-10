import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegisterMovementsComponent } from './cash-register-movements.component';

const routes: Routes = [
  { path: '', component: CashRegisterMovementsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegisterMovementsRoutingModule {}
