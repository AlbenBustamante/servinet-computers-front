import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '@models/enums';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(role: Role): string {
    if (role === Role.CASHIER) {
      return 'Cajero';
    }

    if (role === Role.SUPERVISOR) {
      return 'Supervisor';
    }

    if (role === Role.ADMIN) {
      return 'Administrador';
    }

    return 'Desconocido';
  }
}
