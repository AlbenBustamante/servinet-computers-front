import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ICashRegisterDetailReportsDto,
  IMyCashRegistersReports,
} from '@models/cash-register.model';

@Component({
  selector: 'app-my-stats-header',
  templateUrl: './my-stats-header.component.html',
  styleUrls: ['./my-stats-header.component.css'],
})
export class MyStatsHeaderComponent {
  @Output() handleSelectedCashRegister = new EventEmitter<string | number>();
  @Input({ required: true })
  currentCashRegister!: ICashRegisterDetailReportsDto | undefined;
  @Input({ required: true }) currentCashRegisterIndex!: number;
  @Input({ required: true }) myCashRegisters!:
    | IMyCashRegistersReports
    | undefined;

  emitHandleSelectedCashRegister(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    this.handleSelectedCashRegister.emit(value);
  }
}
