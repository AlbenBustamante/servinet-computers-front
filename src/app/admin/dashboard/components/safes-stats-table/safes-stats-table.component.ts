import { CurrencyPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-safes-stats-table',
  templateUrl: './safes-stats-table.component.html',
})
export class SafesStatsTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'safe.numeral', title: 'Numeral', align: 'center' },
      //{ key: 'safeId', title: 'Traslados', align: 'right' }, // TODO: Actualizar lógica en el back-end.
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
    ],
    body: computed(() => this.dashboardService.dashboard()?.safeDetails),
    noDataMessage: 'Vaya, parece que no se encontraron las cajas',
  };

  constructor(private readonly dashboardService: DashboardService) {}
}
