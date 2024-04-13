import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';

@Component({
  selector: 'app-cash-register-card',
  templateUrl: './cash-register-card.component.html',
  styleUrls: ['./cash-register-card.component.css'],
})
export class CashRegisterCardComponent {
  @Input({ required: true }) cashRegister!: ICashRegisterRes;
  @Output() openCash = new EventEmitter();

  clickHandler() {
    this.openCash.emit();
  }
}
