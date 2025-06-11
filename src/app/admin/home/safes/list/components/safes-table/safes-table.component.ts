import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SafeService } from '@services/safe.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';

@Component({
  selector: 'app-safes-table',
  templateUrl: './safes-table.component.html',
})
export class SafesTableComponent {
  readonly removeLoading = signal<boolean>(false);
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'numeral', title: 'Numeral', align: 'center' },
      {
        key: 'createdDate',
        title: 'Fecha de creación',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortDateTime',
      },
    ],
    body: this.safeService.safes,
    noDataMessage: 'Sin cajas fuertes registradas...',
    onClick: (index) => this.goToMovements(index),
    onRemove: (index) => this.onRemove(index),
  };

  constructor(
    private readonly safeService: SafeService,
    private readonly router: Router
  ) {}

  goToMovements(index: number) {
    const { id } = this.safeService.safes()[index];
    this.router.navigate(['admin', 'home', 'cajas-fuertes', id]);
  }

  onRemove(index: number) {
    if (this.removeLoading()) {
      return;
    }

    this.removeLoading.set(true);

    const { id } = this.safeService.safes()[index];

    this.safeService.delete(id).subscribe({
      next: () => this.removeLoading.set(false),
      error: (err) => {
        console.log(err);
        this.removeLoading.set(false);
      },
    });
  }
}
