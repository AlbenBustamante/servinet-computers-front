import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {
  const token = inject(TokenService).get();

  if (token) {
    inject(Router).navigateByUrl('/portal');
    return false;
  }

  return true;
};
