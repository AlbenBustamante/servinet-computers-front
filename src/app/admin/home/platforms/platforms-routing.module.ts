import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformsListComponent } from './platforms-list/platforms-list.component';
import { PlatformDetailsComponent } from './platform-details/platform-details.component';

const routes: Routes = [
  { path: '', component: PlatformsListComponent },
  { path: ':id', component: PlatformDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformsRoutingModule {}
