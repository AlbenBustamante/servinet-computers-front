import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { ITransactionDetailRes } from '@models/transaction.model';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { TransactionDetailTypePipe } from '@shared/pipes/transaction-detail-type.pipe';

@Component({
  selector: 'app-detailed-transactions-table',
  templateUrl: './detailed-transactions-table.component.html',
  styleUrls: ['./detailed-transactions-table.component.css'],
})
export class DetailedTransactionsTableComponent {
  readonly transactions;
  readonly table: ITable;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.transactions = computed(
      () =>
        this.cashRegisterDetailMovementService.movement()?.transactions
          .transactions
    );

    this.table = {
      header: [
        { key: 'id', title: 'ID', align: 'center' },
        { key: 'description', title: 'Nota' },
        { key: 'type', title: 'Tipo', pipe: new TransactionDetailTypePipe() },
        {
          key: 'value',
          title: 'Valor',
          align: 'right',
          pipe: new CurrencyPipe('es-CO'),
        },
        {
          key: 'commission',
          title: 'Adicional',
          align: 'right',
          pipe: new CurrencyPipe('es-CO'),
        },
        {
          key: 'date',
          title: 'Hora',
          pipe: new DatePipe('es-CO'),
          pipeArgs: 'shortTime',
        },
      ],
      body: this.transactions,
      noDataMessage: 'Parece que aún no tiene transacciones',
    };
  }
}
