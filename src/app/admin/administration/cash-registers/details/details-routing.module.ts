import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementsComponent } from './movements/movements.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: MovementsComponent },
  { path: ':detailId', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
