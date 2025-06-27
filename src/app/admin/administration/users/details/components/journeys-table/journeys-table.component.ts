import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { DetailService } from '@admin/administration/users/services/detail.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journeys-table',
  templateUrl: './journeys-table.component.html',
})
export class JourneysTableComponent {
  readonly loading;

  readonly table: ITable = {
    header: [
      { key: 'cashRegisterDetail.id', title: 'ID', align: 'center' },
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
        key: 'cashRegisterDetail.finalWorking',
        title: 'Hora Salida',
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
        key: 'totalOfDiscounts',
        title: 'Total por descontar',
        align: 'right',
        pipe: new CurrencyPipe(this.locale),
      },
      { key: 'totalOfHours', title: 'Horas trabajadas' },
      {
        key: 'totalOfTransactions',
        title: 'Transacciones',
        align: 'center',
      },
    ],
    body: computed(() => {
      const journeys = this.detailService.journeys();
      return journeys?.journeys;
    }),
    noDataMessage: 'El usuario no cuenta con jornadas en el mes seleccionado',
    onClick: (index) => this.goToDetails(index),
  };

  constructor(
    private readonly detailService: DetailService,
    private readonly router: Router,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loading = this.detailService.loading;
  }

  goToDetails(index: number) {
    const cashRegisterDetail =
      this.detailService.journeys()!.journeys[index].cashRegisterDetail;

    this.router.navigateByUrl(
      `admin/administracion/cajas-registradoras/${cashRegisterDetail.cashRegister.id}/${cashRegisterDetail.id}`
    );
  }
}
