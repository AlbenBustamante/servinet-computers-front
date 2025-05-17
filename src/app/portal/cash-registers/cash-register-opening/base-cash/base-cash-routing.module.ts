import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseCashComponent } from './base-cash.component';

const routes: Routes = [{ path: '', component: BaseCashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseCashRoutingModule {}
