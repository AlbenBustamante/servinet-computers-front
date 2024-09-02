import { Component, WritableSignal } from '@angular/core';
import { IPortalPlatform } from '@models/platform.model';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'app-platform-balance-info',
  templateUrl: './platform-balance-info.component.html',
  styleUrls: ['./platform-balance-info.component.css'],
})
export class PlatformBalanceInfoComponent {
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;
  readonly editing: WritableSignal<boolean>;

  constructor(private readonly platformService: PlatformService) {
    this.editing = this.platformService.editing;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;
  }

  handleEditing() {
    this.editing.update((prevValue) => !prevValue);
  }
}
