import { Component, Input } from '@angular/core';
import { ICashRegisterDetailReportsDto } from '@models/cash-register.model';

@Component({
  selector: 'app-cashier-some-stats',
  templateUrl: './cashier-some-stats.component.html',
  styleUrls: ['./cashier-some-stats.component.css'],
})
export class CashierSomeStatsComponent {
  @Input({ required: true }) reports!:
    | ICashRegisterDetailReportsDto
    | undefined;
}
