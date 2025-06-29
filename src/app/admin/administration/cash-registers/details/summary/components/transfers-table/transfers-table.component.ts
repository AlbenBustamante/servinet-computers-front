import { Component, computed } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
})
export class TransfersTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.transfers;
    }),
    noDataMessage: 'Parece que aún no cuenta con transferencias entre cajas',
  };

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
  }
}
