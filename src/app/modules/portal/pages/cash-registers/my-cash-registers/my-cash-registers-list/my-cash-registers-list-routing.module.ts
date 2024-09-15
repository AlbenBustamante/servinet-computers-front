import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCashRegistersListComponent } from './my-cash-registers-list.component';

const routes: Routes = [{ path: '', component: MyCashRegistersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCashRegistersListRoutingModule {}
