import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { DetailService } from '@admin/administration/safes/services/detail.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-bases-table',
  templateUrl: './bases-table.component.html',
})
export class BasesTableComponent {
  readonly loading;

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'base',
        title: 'Base',
        align: 'right',
        pipe: new CurrencyPipe(this.locale),
      },
      {
        key: 'createdBy',
        title: 'Creado por',
        align: 'center',
      },
      {
        key: 'createdDate',
        title: 'Fecha y Hora',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortDateTime',
      },
    ],
    body: computed(() => {
      const details = this.detailService.details();
      return details?.bases;
    }),
    noDataMessage: 'Parece que aún han habido movimientos',
  };

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly detailService: DetailService
  ) {
    this.loading = this.detailService.loading;
  }
}
