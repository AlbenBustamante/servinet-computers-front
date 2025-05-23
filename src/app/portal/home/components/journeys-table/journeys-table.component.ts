import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { HomeService } from '@portal/home/services/home.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-journeys-table',
  templateUrl: './journeys-table.component.html',
})
export class JourneysTableComponent {
  readonly loading;

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'createdDate',
        title: 'Fecha',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortDate',
      },
      {
        key: 'initialWorking',
        title: 'Hora Entrada',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'initialBreak',
        title: 'Entrada Almuerzo',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'finalBreak',
        title: 'Salida Almuerzo',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'finalWorking',
        title: 'Hora Salida',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
    ],
    body: this.service.journeys,
    noDataMessage: 'No se encontraron jornadas',
  };

  constructor(
    private readonly service: HomeService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loading = this.service.loading;
  }
}
