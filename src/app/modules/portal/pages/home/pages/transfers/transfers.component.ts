import { Component, signal } from '@angular/core';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashTransferService } from '@services/cash-transfer.service';
import { MyCashService } from '@services/my-cash.service';
import { MyHomeService } from '@services/my-home.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
})
export class TransfersComponent {
  readonly loading;
  readonly availableTransfers;
  readonly cashTransfers;

  constructor(
    private readonly cashTransferService: CashTransferService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly myHomeService: MyHomeService,
    private readonly myCashService: MyCashService
  ) {
    this.loading = this.myHomeService.loading;
    this.availableTransfers = this.myHomeService.availableTransfers;
    this.cashTransfers = this.myHomeService.cashTransfers;
  }

  ngOnInit() {
    this.loading.set(true);

    const { cashRegisterDetail } = this.myCashService.currentCashRegister()!;

    const calls = zip(
      this.cashTransferService.getAvailableTransfers(),
      this.cashRegisterDetailService.getCashTransfers(cashRegisterDetail.id)
    );

    calls.subscribe({
      next: ([availableTransfers, cashTransfers]) => {
        this.availableTransfers.set(availableTransfers);
        this.cashTransfers.set(cashTransfers);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
