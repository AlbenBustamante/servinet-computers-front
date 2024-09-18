import { Component, signal } from '@angular/core';
import { ICashRegisterDetailReportsDto } from '@models/cash-register.model';
import { MyCashService } from '@services/my-cash.service';

@Component({
  selector: 'app-my-cash-registers',
  templateUrl: './my-cash-registers.component.html',
  styleUrls: ['./my-cash-registers.component.css'],
})
export class MyCashRegistersComponent {
  readonly myCashRegisters;
  readonly selectedCashRegister = signal<
    ICashRegisterDetailReportsDto | undefined
  >(undefined);

  constructor(private readonly myCashService: MyCashService) {
    this.myCashRegisters = this.myCashService.myCashRegisters;
  }

  handleSelectedCashRegister(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    if (value === 'all') {
      return this.selectedCashRegister.set(
        this.myCashRegisters()?.finalReport!
      );
    }

    const index = Number(value);

    this.selectedCashRegister.set(
      this.myCashRegisters()?.cashRegisterDetailsReports[index]!
    );

    console.log({ res: this.selectedCashRegister() });
  }
}
