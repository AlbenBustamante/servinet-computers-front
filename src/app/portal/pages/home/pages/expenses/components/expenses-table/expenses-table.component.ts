import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DiscountPipe } from '@shared/pipes/discount.pipe';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent {
  @Output() onEdit = new EventEmitter<number>();
  @Output() onRemove = new EventEmitter<number>();

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'description', title: 'Nota' },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      { key: 'discount', title: 'Descuenta', pipe: new DiscountPipe() },
      {
        key: 'createdDate',
        title: 'Hora',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
    ],
    body: this.myHomeService.expenses,
    noDataMessage: 'Parece que aún no tienes gastos',
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.emitOnRemove(index),
  };

  constructor(private readonly myHomeService: MyHomeService) {}

  emitOnEdit(index: number) {
    const { id, description, value, discount } =
      this.myHomeService.expenses()[index];

    this.myHomeService.updateExpenseForm.patchValue({
      description,
      value,
      discount,
    });

    this.onEdit.emit(id);
  }

  emitOnRemove(index: number) {
    const { id } = this.myHomeService.expenses()[index];
    this.onRemove.emit(id);
  }
}
