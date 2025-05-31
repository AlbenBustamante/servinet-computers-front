import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
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
      {
        key: 'cashRegisterDetail.createdDate',
        title: 'Fecha',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortDate',
      },
      {
        key: 'cashRegisterDetail.initialWorking',
        title: 'Hora Entrada',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'cashRegisterDetail.initialBreak',
        title: 'Entrada Almuerzo',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'cashRegisterDetail.finalBreak',
        title: 'Salida Almuerzo',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'cashRegisterDetail.finalWorking',
        title: 'Hora Salida',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortTime',
      },
      {
        key: 'totalOfDiscounts',
        title: 'Por descontar',
        pipe: new CurrencyPipe(this.locale),
        align: 'right',
      },
      {
        key: 'totalOfHours',
        title: 'Horas trabajadas',
      },
    ],
    body: computed(() => this.service.journeys()?.journeys),
    noDataMessage: 'No se encontraron jornadas',
  };

  constructor(
    private readonly service: HomeService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loading = this.service.loading;
  }
}
