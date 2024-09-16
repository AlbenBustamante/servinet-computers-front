import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCashRegistersComponent } from './my-cash-registers.component';

const routes: Routes = [{ path: '', component: MyCashRegistersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCashRegistersRoutingModule {}
