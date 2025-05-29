import { Component, signal } from '@angular/core';
import { Role } from '@models/enums';
import { PlatformService } from '@services/platform.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-platform-balance-info',
  templateUrl: './platform-balance-info.component.html',
})
export class PlatformBalanceInfoComponent {
  readonly selectedPortalPlatform;
  readonly editing;
  readonly canEdit = signal<boolean>(false);

  constructor(
    private readonly platformService: PlatformService,
    private readonly tokenService: TokenService
  ) {
    this.editing = this.platformService.balanceEditing;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;

    const role = this.tokenService.getInfo().role;
    this.canEdit.set(role !== Role.CASHIER);
  }

  handleEditing() {
    this.editing.update((prevValue) => !prevValue);
  }
}
