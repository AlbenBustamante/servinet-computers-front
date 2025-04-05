import { Pipe, PipeTransform } from '@angular/core';
import { ChangeLogType } from '@models/enums';

@Pipe({
  name: 'changeLogType',
})
export class ChangeLogTypePipe implements PipeTransform {
  transform(value: ChangeLogType): string {
    switch (value) {
      case ChangeLogType.CASH_TRANSFER:
        return 'Transferencia entre Cajas';
      case ChangeLogType.EXPENSE:
        return 'Gasto';
      case ChangeLogType.TRANSACTION_DETAIL:
        return 'Transacción';
      default:
        return 'Berserk';
    }
  }
}
