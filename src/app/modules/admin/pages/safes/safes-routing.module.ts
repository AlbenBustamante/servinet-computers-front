import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafesComponent } from './safes.component';

const routes: Routes = [{ path: '', component: SafesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafesRoutingModule {}
