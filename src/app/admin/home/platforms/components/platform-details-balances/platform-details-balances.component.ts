import { Component, Input } from '@angular/core';
import { IPlatformBalanceRes } from '@models/platform.model';

@Component({
  selector: 'app-platform-details-balances',
  templateUrl: './platform-details-balances.component.html',
  styleUrls: ['./platform-details-balances.component.css'],
})
export class PlatformDetailsBalancesComponent {
  @Input({ required: true }) balances: IPlatformBalanceRes | undefined;
}
