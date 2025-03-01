import { CurrencyPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-platforms-stats-table',
  templateUrl: './platforms-stats-table.component.html',
  styleUrls: ['./platforms-stats-table.component.css'],
})
export class PlatformsStatsTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'platformName', title: 'Nombre' },
      {
        key: 'initialBalance',
        title: 'Saldo Inicial',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      {
        key: 'finalBalance',
        title: 'Saldo Final',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      { key: 'transfersAmount', title: 'Traslados', align: 'center' },
      {
        key: 'transfersTotal',
        title: 'Total Transferido',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
      {
        key: 'total',
        title: 'Total',
        align: 'right',
        pipe: new CurrencyPipe('es-CO'),
      },
    ],
    body: computed(() => this.dashboardService.dashboard()?.platformsStats),
    noDataMessage: 'Vaya, parece que no se encontraron los saldos',
  };

  constructor(private readonly dashboardService: DashboardService) {}
}
