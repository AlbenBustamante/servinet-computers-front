import { Component, signal } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashTransferService } from '@services/cash-transfer.service';
import { MyCashService } from '@services/my-cash.service';
import { TransfersService } from '@services/transfers.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  readonly loading = signal<boolean>(false);
  readonly availableTransfers;
  readonly cashTransfers;

  constructor(
    private readonly cashTransferService: CashTransferService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly transfersService: TransfersService,
    private readonly myCashService: MyCashService
  ) {
    this.availableTransfers = this.transfersService.availableTransfers;
    this.cashTransfers = this.transfersService.cashTransfers;
  }

  ngOnInit() {
    this.loading.set(true);

    const { cashRegisterDetail } = this.myCashService.currentCashRegister()!;

    zip(
      this.cashTransferService.getAvailableTransfers(),
      this.cashRegisterDetailService.getCashTransfers(cashRegisterDetail.id)
    ).subscribe(([availableTransfers, cashTransfers]) => {
      this.availableTransfers.set(availableTransfers);
      this.cashTransfers.set(cashTransfers);
      this.loading.set(false);
    });
  }
}
