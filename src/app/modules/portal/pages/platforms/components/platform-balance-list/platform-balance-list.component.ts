import { Component, WritableSignal } from '@angular/core';
import { IPlatformBalanceRes } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { PlatformTransferService } from '@services/platform-transfer.service';

@Component({
  selector: 'app-platform-balance-list',
  templateUrl: './platform-balance-list.component.html',
  styleUrls: ['./platform-balance-list.component.css'],
})
export class PlatformBalanceListComponent {
  readonly platformBalances: WritableSignal<IPlatformBalanceRes[]>;
  readonly selectedPlatformBalance: WritableSignal<IPlatformBalanceRes | null>;
  readonly selectedPlatformBalanceIndex: WritableSignal<number | null>;
  readonly editing: WritableSignal<boolean>;
  readonly vouchers: WritableSignal<File[]>;

  constructor(
    private readonly platformBalanceService: PlatformBalanceService,
    private readonly platformTransferService: PlatformTransferService
  ) {
    this.editing = this.platformBalanceService.editing;
    this.platformBalances = this.platformBalanceService.platformBalances;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;

    this.selectedPlatformBalanceIndex =
      this.platformBalanceService.selectedPlatformBalanceIndex;

    this.vouchers = this.platformTransferService.vouchers;
  }

  handleSelectedPlatformBalance(
    platformBalance: IPlatformBalanceRes,
    index: number
  ) {
    if (this.selectedPlatformBalanceIndex() === index) {
      return;
    }

    this.editing.set(false);
    this.selectedPlatformBalance.set(platformBalance);
    this.selectedPlatformBalanceIndex.set(index);
    this.vouchers.set([]);
  }
}
