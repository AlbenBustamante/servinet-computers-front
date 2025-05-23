import { Component } from '@angular/core';
import { DetailService } from '../../services/detail.service';

@Component({
  selector: 'app-platform-details-balances',
  templateUrl: './platform-details-balances.component.html',
})
export class PlatformDetailsBalancesComponent {
  readonly details;
  readonly loading;

  constructor(private readonly service: DetailService) {
    this.details = this.service.details;
    this.loading = this.service.loading;
  }
}
