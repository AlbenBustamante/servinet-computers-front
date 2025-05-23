import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { LayoutComponent } from './layout/layout.component';
import { JourneysComponent } from './journeys/journeys.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'mi-cuenta', pathMatch: 'full' },
      { path: 'mi-cuenta', component: AboutMeComponent },
      {
        path: 'jornadas',
        component: JourneysComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
