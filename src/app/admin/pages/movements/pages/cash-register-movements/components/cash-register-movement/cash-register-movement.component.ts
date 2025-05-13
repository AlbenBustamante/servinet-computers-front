import { Component, Input } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-cash-register-movement',
  templateUrl: './cash-register-movement.component.html',
  styleUrls: ['./cash-register-movement.component.css'],
})
export class CashRegisterMovementComponent {
  @Input({ required: true }) cashRegisterDetail!: ICashRegisterDetailRes;
}
