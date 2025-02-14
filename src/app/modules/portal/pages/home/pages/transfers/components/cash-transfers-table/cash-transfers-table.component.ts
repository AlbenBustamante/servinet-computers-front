import { Component } from '@angular/core';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-cash-transfers-table',
  templateUrl: './cash-transfers-table.component.html',
  styleUrls: ['./cash-transfers-table.component.css'],
})
export class CashTransfersTableComponent {
  readonly cashTransfers;

  constructor(private readonly myHomeService: MyHomeService) {
    this.cashTransfers = this.myHomeService.cashTransfers;
  }
}
