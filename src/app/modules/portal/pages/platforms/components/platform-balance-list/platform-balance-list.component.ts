import { Component, WritableSignal } from '@angular/core';
import { IPlatformBalanceRes } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';

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

  constructor(private readonly platformBalanceService: PlatformBalanceService) {
    this.editing = this.platformBalanceService.editing;
    this.platformBalances = this.platformBalanceService.platformBalances;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;

    this.selectedPlatformBalanceIndex =
      this.platformBalanceService.selectedPlatformBalanceIndex;
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
  }
}
