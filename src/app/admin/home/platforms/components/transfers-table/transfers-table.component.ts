import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DetailService } from '../../services/detail.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PlatformTransferService } from '@services/platform-transfer.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
})
export class TransfersTableComponent {
  readonly loading;

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'value',
        title: 'Valor',
        align: 'right',
        pipe: new CurrencyPipe(this.locale),
      },
      {
        key: 'date',
        title: 'Fecha',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortDate',
      },
    ],
    body: this.service.transfers,
    noDataMessage: 'No se han realizado transferencias',
    onRemove: (index) => this.remove(index),
  };

  constructor(
    private readonly service: DetailService,
    private readonly platfromTransferService: PlatformTransferService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loading = this.service.loading;
  }

  remove(index: number) {
    const { id } = this.service.transfers()[index];

    this.loading.set(true);

    this.platfromTransferService.delete(id).subscribe({
      next: () => {
        this.service.transfers.update((prevValue) => {
          const index = prevValue.findIndex((t) => t.id === id);

          if (index > -1) {
            prevValue.splice(index, 1);
          }

          return prevValue;
        });

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
