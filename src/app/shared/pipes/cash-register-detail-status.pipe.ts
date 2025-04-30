import { Pipe, PipeTransform } from '@angular/core';
import { CashRegisterDetailStatus } from '@models/enums';

@Pipe({
  name: 'cashRegisterDetailStatus',
})
export class CashRegisterDetailStatusPipe implements PipeTransform {
  transform(value: CashRegisterDetailStatus): string {
    if (value === CashRegisterDetailStatus.WORKING) {
      return 'Trabajando';
    }

    if (value === CashRegisterDetailStatus.RESTING) {
      return 'En descanso';
    }

    if (value === CashRegisterDetailStatus.CLOSED) {
      return 'Terminada';
    }

    return '';
  }
}
