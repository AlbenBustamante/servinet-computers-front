import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PlatformService } from '@services/platform.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-platforms-table',
  templateUrl: './platforms-table.component.html',
  styleUrls: ['./platforms-table.component.css'],
})
export class PlatformsTableComponent {
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'name', title: 'Nombre' },
      {
        key: 'createdDate',
        title: 'Fecha de creación',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortDateTime',
      },
    ],
    body: this.platformService.platforms,
    noDataMessage: 'Sin plataformas registradas...',
  };

  constructor(private readonly platformService: PlatformService) {}
}
