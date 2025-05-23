import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { MovementsComponent } from './movements/movements.component';

const routes: Routes = [
  { path: '', component: SummaryComponent },
  { path: 'movimientos', component: MovementsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
