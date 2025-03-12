import { Component, Input } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-cashier-hour-stats',
  templateUrl: './cashier-hour-stats.component.html',
  styleUrls: ['./cashier-hour-stats.component.css'],
})
export class CashierHourStatsComponent {
  @Input({ required: true }) cashier!: string;
  @Input({ required: true }) details!: ICashRegisterDetailRes | undefined;
}
