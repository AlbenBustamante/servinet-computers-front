import { Component, inject } from '@angular/core';
import { RequestStatus } from '@models/request-status.model';
import { ITransferRes } from '@models/transfer.model';
import { CampusService } from '@services/campus.service';
import { TransferService } from '@services/transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  private readonly campusService = inject(CampusService);
  private readonly transferService = inject(TransferService);
  readonly transfers = this.campusService.transfers;
  transfersStatus: RequestStatus = 'loading';

  constructor() {}

  ngOnInit() {
    this.campusService.getTransfers({}).subscribe({
      next: () => {
        this.transfersStatus = 'success';
      },
      error: (error) => {
        console.log(error);
        this.transfersStatus = 'failed';
      },
    });
  }

  delete(transferId: number) {
    this.transfersStatus = 'loading';

    this.transferService.delete(transferId).subscribe({
      next: (ok) => {
        if (ok) {
          this.campusService.getTransfers({}).subscribe({
            next: () => {
              this.transfersStatus = 'success';
            },
            error: (error) => {
              console.log(error);
              this.transfersStatus = 'failed';
            },
          });
        }
      },
      error: (error) => {
        console.log(error);
        this.transfersStatus = 'failed';
      },
    });
  }
}
