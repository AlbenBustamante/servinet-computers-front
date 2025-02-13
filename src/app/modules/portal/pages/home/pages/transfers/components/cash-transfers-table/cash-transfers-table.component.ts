import { Component } from '@angular/core';
import { TransfersService } from '@services/transfers.service';

@Component({
  selector: 'app-cash-transfers-table',
  templateUrl: './cash-transfers-table.component.html',
  styleUrls: ['./cash-transfers-table.component.css'],
})
export class CashTransfersTableComponent {
  readonly cashTransfers;

  constructor(private readonly transfersService: TransfersService) {
    this.cashTransfers = this.transfersService.cashTransfers;
  }
}
