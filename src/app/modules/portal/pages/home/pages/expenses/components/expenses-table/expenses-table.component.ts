import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DiscountPipe } from '@shared/pipes/discount.pipe';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent {
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
  };

  constructor(private readonly myHomeService: MyHomeService) {}
}
