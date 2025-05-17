import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformsListComponent } from './platforms-list/platforms-list.component';

const routes: Routes = [{ path: '', component: PlatformsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformsRoutingModule {}
