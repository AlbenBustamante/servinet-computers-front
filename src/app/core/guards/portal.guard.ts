import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export const portalGuard: CanActivateFn = () => {
  const token = inject(TokenService).get();

  if (!token) {
    inject(Router).navigateByUrl('/login');
    return false;
  }

  return true;
};
