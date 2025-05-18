import { Component, Input } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-cash-register-movements-list',
  templateUrl: './cash-register-movements-list.component.html',
  styleUrls: ['./cash-register-movements-list.component.css'],
})
export class CashRegisterMovementsListComponent {
  @Input({ required: true }) cashRegisterDetails!: ICashRegisterDetailRes[];
}
