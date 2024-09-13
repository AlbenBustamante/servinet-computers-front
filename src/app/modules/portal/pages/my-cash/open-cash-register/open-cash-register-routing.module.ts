import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenCashRegisterComponent } from './open-cash-register.component';

const routes: Routes = [{ path: '', component: OpenCashRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenCashRegisterRoutingModule {}
