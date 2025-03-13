import { Component, Input } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-cashier-observations',
  templateUrl: './cashier-observations.component.html',
  styleUrls: ['./cashier-observations.component.css'],
})
export class CashierObservationsComponent {
  @Input({ required: true }) details!: ICashRegisterDetailRes | undefined;
}
