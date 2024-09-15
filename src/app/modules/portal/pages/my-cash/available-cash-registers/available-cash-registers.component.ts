import { Component } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-available-cash-registers',
  templateUrl: './available-cash-registers.component.html',
  styleUrls: ['./available-cash-registers.component.css'],
})
export class AvailableCashRegistersComponent {
  private readonly cashRegisterStatus;

  readonly cashRegisters;

  constructor(private readonly myCashService: MyCashService) {
    this.cashRegisters = this.myCashService.cashRegisters;
    this.cashRegisterStatus = this.myCashService.cashRegisterStatus;
  }

  openCash(cashRegister: ICashRegisterRes) {
    this.myCashService.setSelectedCashRegister(cashRegister);
    this.cashRegisterStatus.set('entry-time');
  }
}
