import { Component, signal, WritableSignal } from '@angular/core';
import { Role } from '@models/enums';
import { IPortalPlatform } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-platform-balance-info',
  templateUrl: './platform-balance-info.component.html',
  styleUrls: ['./platform-balance-info.component.css'],
})
export class PlatformBalanceInfoComponent {
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;
  readonly editing: WritableSignal<boolean>;
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
