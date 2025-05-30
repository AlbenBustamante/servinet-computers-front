import { Component, Input } from '@angular/core';
import { IBankDepositDto } from '@models/bank-deposit.model';

@Component({
  selector: 'app-bank-deposit-item',
  templateUrl: './bank-deposit-item.component.html',
})
export class BankDepositItemComponent {
  @Input({ required: true }) bankDeposit!: IBankDepositDto;
  @Input({ required: true }) selected!: boolean;
}
