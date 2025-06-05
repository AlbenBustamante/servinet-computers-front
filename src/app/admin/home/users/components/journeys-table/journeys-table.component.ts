import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DetailService } from '../../services/detail.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-journeys-table',
  templateUrl: './journeys-table.component.html',
})
export class JourneysTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      {
        key: 'cashRegisterDetail.createdDate',
        title: 'Fecha',
        pipe: new DatePipe(this.locale),
        pipeArgs: 'shortDate',
      },
      { key: 'totalOfDiscounts', title: 'Total por descontar' },
      { key: 'totalOfHours', title: 'Horas trabajadas' },
    ],
    body: computed(() => {
      const journeys = this.detailService.journeys();
      return journeys?.journeys;
    }),
    noDataMessage: 'El usuario no cuenta con jornadas en el mes seleccionado',
  };

  constructor(
    private readonly detailService: DetailService,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {}
}
