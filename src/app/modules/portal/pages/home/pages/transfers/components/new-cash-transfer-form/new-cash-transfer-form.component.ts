import { Component, signal } from '@angular/core';
import { TransfersService } from '@services/transfers.service';

type SelectedType = 'CASH_REGISTER' | 'SAFE';

@Component({
  selector: 'app-new-cash-transfer-form',
  templateUrl: './new-cash-transfer-form.component.html',
  styleUrls: ['./new-cash-transfer-form.component.css'],
})
export class NewCashTransferFormComponent {
  readonly selectedType = signal<SelectedType>('CASH_REGISTER');
  readonly availableTransfers;

  constructor(private readonly transfersService: TransfersService) {
    this.availableTransfers = this.transfersService.availableTransfers;
  }

  setSelectedType(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedType.set(target.value as SelectedType);
  }
}
