import { Component, computed } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-discounts-table',
  templateUrl: './discounts-table.component.html',
})
export class DiscountsTableComponent {
  readonly reports;
  readonly table: ITable = {
    header: [],
    body: computed(() => {
      const reports = this.reports();
      return reports?.transactions.discounts;
    }),
    noDataMessage: 'Parece que aún no cuenta con gastos por descontar',
  };

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
  }
}
