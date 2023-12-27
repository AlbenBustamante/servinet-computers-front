import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthToken } from '../models/enums';

export function tokenGuard(type: AuthToken): CanActivateFn {
  return () => {
    const tokenInfo = inject(TokenService).getInfo();

    if (tokenInfo.type !== type) {
      return false;
    }

    return true;
  };
}
