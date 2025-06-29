import { DetailService } from '../../../services/detail.service';
import { Component, computed } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.transactions;
    }),
    noDataMessage: 'Parece que aún no cuenta con transacciones',
  };

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
  }
}
