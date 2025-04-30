import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafeMovementsComponent } from './safe-movements.component';

const routes: Routes = [{ path: '', component: SafeMovementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafeMovementsRoutingModule {}
