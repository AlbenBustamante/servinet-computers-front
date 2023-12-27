import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export function redirectGuard(route: string): CanActivateFn {
  return () => {
    const token = inject(TokenService).get();

    if (!token) {
      return true;
    }

    inject(Router).navigateByUrl(route);

    return false;
  };
}
