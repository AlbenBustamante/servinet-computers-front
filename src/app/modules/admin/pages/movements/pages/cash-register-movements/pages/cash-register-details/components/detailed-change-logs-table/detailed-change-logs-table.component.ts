import { DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { CashRegisterDetailStatusPipe } from '@shared/pipes/cash-register-detail-status.pipe';
import { ChangeLogActionPipe } from '@shared/pipes/change-log-action.pipe';
import { ChangeLogTypePipe } from '@shared/pipes/change-log-type.pipe';

@Component({
  selector: 'app-detailed-change-logs-table',
  templateUrl: './detailed-change-logs-table.component.html',
  styleUrls: ['./detailed-change-logs-table.component.css'],
})
export class DetailedChangeLogsTableComponent {
  readonly changeLogs;
  readonly table: ITable;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.changeLogs = computed(
      () => this.cashRegisterDetailMovementService.movement()?.changeLogs
    );

    this.table = {
      header: [
        { key: 'id', title: 'ID', align: 'center' },
        {
          key: 'type',
          title: 'Tipo de registro',
          pipe: new ChangeLogTypePipe(),
        },
        { key: 'action', title: 'Acción', pipe: new ChangeLogActionPipe() },
        {
          key: 'currentStatus',
          title: 'Estado del cajero',
          pipe: new CashRegisterDetailStatusPipe(),
        },
        {
          key: 'createdDate',
          title: 'Hora de registro',
          pipe: new DatePipe('es-CO'),
          pipeArgs: 'shortTime',
        },
      ],
      body: this.changeLogs,
      noDataMessage: 'El usuario no cuenta con modificaciones o eliminaciones',
    };
  }
}
