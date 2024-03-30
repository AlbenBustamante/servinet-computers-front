import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '@guards/admin.guard';
import { portalGuard } from '@guards/portal.guard';
import { loginGuard } from '@guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadChildren: () => import('./modules/login/login.module'),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./modules/admin/admin.module'),
  },
  {
    path: 'portal',
    canActivate: [portalGuard],
    loadChildren: () => import('./modules/portal/portal.module'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
