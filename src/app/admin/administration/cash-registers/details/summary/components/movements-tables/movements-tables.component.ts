import { Component, signal } from '@angular/core';
import { DetailService } from '../../../services/detail.service';

type SelectedMovement =
  | 'transactions'
  | 'expenses'
  | 'discounts'
  | 'transfers'
  | 'banks';

@Component({
  selector: 'app-movements-tables',
  templateUrl: './movements-tables.component.html',
})
export class MovementsTablesComponent {
  readonly loading;
  readonly selectedMovement = signal<SelectedMovement>('transactions');

  constructor(private readonly service: DetailService) {
    this.loading = this.service.loading;
  }

  setSelectedMovement(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value as SelectedMovement;
    this.selectedMovement.set(value);
  }
}
