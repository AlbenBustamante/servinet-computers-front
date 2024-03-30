import { Component, inject } from '@angular/core';
import { RequestStatus } from '@models/request-status.model';
import { TransferService } from '@services/transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  private readonly transferService = inject(TransferService);
  transfersStatus: RequestStatus = 'init';

  constructor() {}

  ngOnInit() {}

  delete(transferId: number) {
    this.transfersStatus = 'loading';

    this.transferService.delete(transferId).subscribe({
      next: (ok) => {
        this.transfersStatus = 'success';
      },
      error: (error) => {
        console.log(error);
        this.transfersStatus = 'failed';
      },
    });
  }
}
