import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { CashRegisterDetailStatusPipe } from '@shared/pipes/cash-register-detail-status.pipe';
import { CashRegisterStatusPipe } from '@shared/pipes/cash-register-status.pipe';

@Component({
  selector: 'app-cash-registers-stats-table',
  templateUrl: './cash-registers-stats-table.component.html',
  styleUrls: ['./cash-registers-stats-table.component.css'],
})
export class CashRegistersStatsTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'cashRegister.numeral', title: 'Caja', align: 'center' },
      {
        key: 'initialBase',
        title: 'Base Inicial',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      {
        key: 'finalBase',
        title: 'Base Final',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      {
        key: 'initialWorking',
        title: 'Hora Entrada',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
      {
        key: 'finalWorking',
        title: 'Hora Salida',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
      { key: 'createdBy', title: 'Cajero' },
      {
        key: 'status',
        title: 'Estado Jornada',
        pipe: new CashRegisterDetailStatusPipe(),
      },
      {
        key: 'cashRegister.status',
        title: 'Estado Caja',
        pipe: new CashRegisterStatusPipe(),
      },
      {
        key: 'createdDate',
        title: 'Apertura',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortTime',
      },
    ],
    body: computed(
      () => this.dashboardService.dashboard()?.cashRegisterDetails
    ),
    noDataMessage: 'Vaya, parece que no se encontraron las jornadas',
  };

  constructor(private readonly dashboardService: DashboardService) {}
}
