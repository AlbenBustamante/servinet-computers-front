import { Component } from '@angular/core';
import { ITransferRes } from 'src/app/core/models/transfer.model';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.css'],
})
export class TransfersTableComponent {
  transfers: ITransferRes[];

  constructor(private readonly transferService: TransferService) {
    this.transfers = this.transferService.getAll();
  }
}
