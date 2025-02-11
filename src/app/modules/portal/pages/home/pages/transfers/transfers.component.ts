import { Component, signal } from '@angular/core';
import { CashTransferService } from '@services/cash-transfer.service';
import { TransfersService } from '@services/transfers.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  readonly loading = signal<boolean>(false);
  readonly availableTransfers;

  constructor(
    private readonly cashTransferService: CashTransferService,
    private readonly transfersService: TransfersService
  ) {
    this.availableTransfers = this.transfersService.availableTransfers;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashTransferService.getAvailableTransfers().subscribe({
      next: (availableTransfers) => {
        this.availableTransfers.set(availableTransfers);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }
}
