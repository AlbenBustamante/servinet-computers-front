import { Pipe, PipeTransform } from '@angular/core';
import { CashRegisterStatus } from '@models/enums';

@Pipe({
  name: 'cashRegisterStatus',
  standalone: true,
})
export class CashRegisterStatusPipe implements PipeTransform {
  transform(value: CashRegisterStatus): string {
    if (value === CashRegisterStatus.AVAILABLE) {
      return 'Disponible';
    }

    if (value === CashRegisterStatus.OCCUPIED) {
      return 'Ocupada';
    }

    if (value === CashRegisterStatus.RESTING) {
      return 'Descansando';
    }

    if (value === CashRegisterStatus.DISABLED) {
      return 'Deshabilitado';
    }

    return '';
  }
}
