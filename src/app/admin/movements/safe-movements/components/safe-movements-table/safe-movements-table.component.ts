import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { SafeMovementService } from '@services/safe-movement.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-safe-movements-table',
  templateUrl: './safe-movements-table.component.html',
  styleUrls: ['./safe-movements-table.component.css'],
})
export class SafeMovementsTableComponent {
  readonly bases;
  readonly table: ITable;

  constructor(private readonly safeMovementService: SafeMovementService) {
    this.bases = computed(() => this.safeMovementService.safeMovement()?.bases);

    this.table = {
      header: [
        { key: 'id', title: 'ID', align: 'center' },
        {
          key: 'base',
          title: 'Base',
          align: 'right',
          pipe: new CurrencyPipe('es-CO'),
        },
        {
          key: 'createdDate',
          title: 'Hora',
          pipe: new DatePipe('es-CO'),
          pipeArgs: 'shortTime',
        },
      ],
      body: this.bases,
      noDataMessage: 'Parece que no hubo movimientos',
    };
  }
}
