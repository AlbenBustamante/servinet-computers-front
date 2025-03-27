import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IPlatformRes } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-platforms-table',
  templateUrl: './platforms-table.component.html',
  styleUrls: ['./platforms-table.component.css'],
})
export class PlatformsTableComponent {
  @Output() onEdit = new EventEmitter<IPlatformRes>();

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
      {
        key: 'modifiedDate',
        title: 'Fecha de actualización',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortDateTime',
      },
      {},
    ],
    body: this.platformService.platforms,
    noDataMessage: 'Sin plataformas registradas...',
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.onRemove(index),
  };

  constructor(private readonly platformService: PlatformService) {}

  private emitOnEdit(index: number) {
    const platform = this.platformService.platforms()[index];
    this.onEdit.emit(platform);
  }

  private onRemove(index: number) {
    const platform = this.platformService.platforms()[index];
    console.log({ on: 'Remove', json: platform });
  }
}
