import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCashRegisterDetailsComponent } from './my-cash-register-details.component';

const routes: Routes = [
  { path: ':id', component: MyCashRegisterDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCashRegisterDetailsRoutingModule {}
