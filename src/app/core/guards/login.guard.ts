import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { inject } from '@angular/core';
import { Role } from '@models/enums';

export const loginGuard: CanActivateFn = () => {
  const token = inject(TokenService).get();

  if (token) {
    const { role } = inject(TokenService).getInfo();

    inject(Router).navigateByUrl(role === Role.ADMIN ? '/admin' : '/portal');

    return false;
  }

  return true;
};
