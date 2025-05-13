import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableCashRegistersComponent } from './available-cash-registers.component';

const routes: Routes = [
  { path: '', component: AvailableCashRegistersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableCashRegistersRoutingModule {}
