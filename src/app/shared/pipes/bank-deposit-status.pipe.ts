import { Pipe, PipeTransform } from '@angular/core';
import { BankDepositStatus } from '@models/enums';

@Pipe({
  name: 'bankDepositStatus',
})
export class BankDepositStatusPipe implements PipeTransform {
  transform(value: BankDepositStatus): unknown {
    if (value === BankDepositStatus.OPEN) {
      return 'Abierto';
    }

    if (value === BankDepositStatus.IN_PROGRESS) {
      return 'Viajando a su destino';
    }

    if (value === BankDepositStatus.CLOSED) {
      return 'Completado';
    }

    return 'Berserk';
  }
}
