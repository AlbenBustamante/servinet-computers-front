import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';
import { CashRegisterStatus } from '@models/enums';

@Component({
  selector: 'app-cash-register-card',
  templateUrl: './cash-register-card.component.html',
  styleUrls: ['./cash-register-card.component.css'],
})
export class CashRegisterCardComponent {
  @Input({ required: true }) cashRegister!: ICashRegisterRes;
  @Output() openCash = new EventEmitter<ICashRegisterRes>();

  clickHandler() {
    this.openCash.emit(this.cashRegister);
  }

  get actionName() {
    const { status } = this.cashRegister;

    switch (status) {
      case CashRegisterStatus.AVAILABLE:
        return 'Abrir caja';
      case CashRegisterStatus.OCCUPIED:
        return 'Ocupada';
      case CashRegisterStatus.DISABLED:
        return 'Cerrada';
      default:
        return 'Berserk';
    }
  }
}
