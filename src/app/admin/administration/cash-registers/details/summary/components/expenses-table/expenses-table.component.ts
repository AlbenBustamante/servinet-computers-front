import { Component, computed } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
})
export class ExpensesTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.expenses;
    }),
    noDataMessage: 'Parece que aún no cuenta con gastos de caja',
  };

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
  }
}
