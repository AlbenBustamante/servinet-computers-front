import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '@models/enums';
import { TokenService } from '@services/token.service';

export const adminGuard: CanActivateFn = () => {
  const token = inject(TokenService).get();

  if (!token) {
    inject(Router).navigateByUrl('/auth');
    return false;
  }

  const { role } = inject(TokenService).getInfo();

  if (role !== Role.ADMIN) {
    inject(Router).navigateByUrl('/auth');
    return false;
  }

  return true;
};
