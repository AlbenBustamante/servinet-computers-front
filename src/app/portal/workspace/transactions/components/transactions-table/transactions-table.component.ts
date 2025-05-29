import { CurrencyPipe, DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { TransactionDetailTypePipe } from '@shared/pipes/transaction-detail-type.pipe';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent {
  @Output() onEdit = new EventEmitter<number>();
  @Output() onRemove = new EventEmitter<number>();

  readonly table: ITable = {
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
    body: this.myHomeService.details,
    noDataMessage: '¡Ten una buena jornada!',
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.emitOnRemove(index),
  };

  constructor(private readonly myHomeService: MyHomeService) {}

  emitOnEdit(index: number) {
    const { id, description, type, value, commission, date } =
      this.myHomeService.details()[index];

    this.myHomeService.updateTransactionDetailForm.patchValue({
      description,
      type,
      value,
      commission,
      date: formatDate(date, 'HH:mm', 'es-CO'),
    });

    this.onEdit.emit(id);
  }

  emitOnRemove(index: number) {
    const { id } = this.myHomeService.details()[index];
    this.onRemove.emit(id);
  }
}
