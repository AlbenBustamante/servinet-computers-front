import { Component, computed } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-banks-table',
  templateUrl: './banks-table.component.html',
})
export class BanksTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.transactions;
    }),
    noDataMessage: 'Parece que aún no cuenta con aportes bancarios',
  };

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
  }
}
