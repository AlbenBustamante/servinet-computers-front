import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cashier-discrepancy',
  templateUrl: './cashier-discrepancy.component.html',
  styleUrls: ['./cashier-discrepancy.component.css'],
})
export class CashierDiscrepancyComponent {
  @Input({ required: true }) discrepancy!: number | undefined;
}
