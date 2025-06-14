import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './movements/movements.component';

const routes: Routes = [
  { path: '', component: MovementsComponent },
  { path: ':detailId', loadChildren: () => import('./summary/summary.module') },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
