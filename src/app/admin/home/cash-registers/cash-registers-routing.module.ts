import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegistersListComponent } from './cash-registers-list/cash-registers-list.component';

const routes: Routes = [{ path: '', component: CashRegistersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegistersRoutingModule {}
