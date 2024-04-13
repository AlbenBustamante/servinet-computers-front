import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCashComponent } from './my-cash.component';

const routes: Routes = [{ path: '', component: MyCashComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCashRoutingModule {}
