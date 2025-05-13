import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalBaseComponent } from './final-base.component';

const routes: Routes = [{ path: '', component: FinalBaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalBaseRoutingModule {}
