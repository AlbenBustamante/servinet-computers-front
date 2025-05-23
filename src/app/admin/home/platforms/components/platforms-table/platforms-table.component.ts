import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-platforms-table',
  templateUrl: './platforms-table.component.html',
})
export class PlatformsTableComponent {
  @Output() onEdit = new EventEmitter<void>();
  readonly removeLoading = signal<boolean>(false);

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
    onClick: (index) => this.onClick(index),
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.onRemove(index),
  };

  constructor(
    private readonly platformService: PlatformService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  private onClick(index: number) {
    const { id } = this.platformService.platforms()[index];
    this.router.navigate(['./', id], { relativeTo: this.route });
  }

  private emitOnEdit(index: number) {
    const { id, name } = this.platformService.platforms()[index];
    this.platformService.platformToUpdateId.set(id);
    this.platformService.updatePlatformForm.get('name')?.setValue(name);
    this.onEdit.emit();
  }

  private onRemove(index: number) {
    if (this.removeLoading()) {
      return;
    }

    this.removeLoading.set(true);

    const platforms = this.platformService.platforms;
    const { id } = platforms()[index];

    this.platformService.delete(id).subscribe({
      next: (_) => {
        platforms.update((prevPlatforms) => {
          prevPlatforms.splice(index, 1);

          return prevPlatforms;
        });

        this.removeLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.removeLoading.set(false);
      },
    });
  }
}
