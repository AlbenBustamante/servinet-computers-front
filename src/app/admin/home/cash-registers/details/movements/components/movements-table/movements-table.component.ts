import { Component, Inject, LOCALE_ID } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movements-table',
  templateUrl: './movements-table.component.html',
})
export class MovementsTableComponent {
  readonly loading;

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'createdDate',
        title: 'Hora Apertura',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      { key: 'user.name', title: 'Cajero' },
      { key: 'user.lastName', title: '' },
    ],
    body: this.service.details,
    noDataMessage: 'Parece que no hay movimientos en el día seleccionado',
    onClick: (index) => this.goToSummary(index),
  };

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loading = this.service.loading;
  }

  goToSummary(index: number) {
    const { id } = this.service.details()[index];
    this.router.navigate([id], { relativeTo: this.route });
  }
}
