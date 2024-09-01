import { Component, WritableSignal } from '@angular/core';
import { IPortalPlatform } from '@models/platform.model';
import { PlatformTransferService } from '@services/platform-transfer.service';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platform-balance-list',
  templateUrl: './platform-balance-list.component.html',
  styleUrls: ['./platform-balance-list.component.css'],
})
export class PlatformBalanceListComponent {
  readonly portalPlatforms: WritableSignal<IPortalPlatform[]>;
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;
  readonly selectedPortalPlatformIndex: WritableSignal<number | null>;
  readonly editing: WritableSignal<boolean>;
  readonly vouchers: WritableSignal<File[]>;

  constructor(
    private readonly platformService: PlatformService,
    private readonly platformTransferService: PlatformTransferService
  ) {
    this.editing = this.platformService.editing;
    this.portalPlatforms = this.platformService.portalPlatforms;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;

    this.selectedPortalPlatformIndex =
      this.platformService.selectedPortalPlatformIndex;

    this.vouchers = this.platformTransferService.vouchers;
  }

  handleSelectedPlatformBalance(
    portalPlatform: IPortalPlatform,
    index: number
  ) {
    if (this.selectedPortalPlatformIndex() === index) {
      return;
    }

    this.editing.set(false);
    this.selectedPortalPlatform.set(portalPlatform);
    this.selectedPortalPlatformIndex.set(index);
    this.vouchers.set([]);
  }
}
