import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashRegistersComponent } from './cash-registers.component';

const routes: Routes = [{ path: '', component: CashRegistersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashRegistersRoutingModule {}
