import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

export function authGuard(route: string): CanActivateFn {
  return () => {
    const token = inject(TokenService).get();

    if (!token) {
      inject(Router).navigateByUrl(route);
      return false;
    }

    return true;
  };
}
