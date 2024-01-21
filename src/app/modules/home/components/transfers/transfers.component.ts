import { Component } from '@angular/core';
import { ITransferRes } from 'src/app/core/models/transfer.model';
import { CampusService } from 'src/app/core/services/campus.service';
import { TransferService } from 'src/app/core/services/transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  transfers!: ITransferRes[];

  constructor(
    private readonly campusService: CampusService,
    private readonly transferService: TransferService
  ) {
    this.campusService.getTransfers({}).subscribe({
      next: (res) => (this.transfers = res.data.results),
      error: (error) => console.log(error),
    });
  }

  delete(transferId: number) {
    this.transferService.delete(transferId).subscribe({
      next: (ok) => {
        if (ok) {
          this.campusService.getTransfers({}).subscribe({
            next: (res) => (this.transfers = res.data.results),
            error: (error) => console.log(error),
          });
        }
      },
      error: (error) => console.log(error),
    });
  }
}
