import { Component } from '@angular/core';
import { PlatformDetailService } from '../../services/platform-detail.service';

@Component({
  selector: 'app-platform-details-balances',
  templateUrl: './platform-details-balances.component.html',
  styleUrls: ['./platform-details-balances.component.css'],
})
export class PlatformDetailsBalancesComponent {
  readonly details;
  readonly loading;

  constructor(private readonly platformDetailService: PlatformDetailService) {
    this.details = this.platformDetailService.details;
    this.loading = this.platformDetailService.loading;
  }
}
