import { Pipe, PipeTransform } from '@angular/core';
import { TransactionDetailType } from '@models/enums';

@Pipe({
  name: 'transactionDetailType',
  standalone: true,
})
export class TransactionDetailTypePipe implements PipeTransform {
  transform(value: TransactionDetailType): string {
    if (value === TransactionDetailType.DEPOSIT) {
      return 'Depósito';
    }

    if (value === TransactionDetailType.WITHDRAWAL) {
      return 'Retiro';
    }

    return '';
  }
}
