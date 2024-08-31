import { Component, WritableSignal } from '@angular/core';
import { IPlatformBalanceRes } from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';

@Component({
  selector: 'app-platform-balance-info',
  templateUrl: './platform-balance-info.component.html',
  styleUrls: ['./platform-balance-info.component.css'],
})
export class PlatformBalanceInfoComponent {
  readonly selectedPlatformBalance: WritableSignal<IPlatformBalanceRes | null>;
  readonly editing: WritableSignal<boolean>;

  constructor(private readonly platformBalanceService: PlatformBalanceService) {
    this.editing = this.platformBalanceService.editing;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;
  }

  handleEditing() {
    this.editing.update((prevValue) => !prevValue);
  }
}
