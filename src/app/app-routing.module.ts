import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { redirectGuard } from './core/guards/redirect.guard';
import { tokenGuard } from './core/guards/token.guard';
import { AuthToken } from './core/models/enums';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'portal',
    // canActivate: [redirectGuard('/')],
    loadChildren: () =>
      import('./modules/portal/portal.module').then((m) => m.PortalModule),
  },
  {
    path: '',
    // canActivate: [authGuard('/portal'), tokenGuard(AuthToken.CAMPUS)],
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
