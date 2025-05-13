import { Component, Input } from '@angular/core';
import { IBankDepositDto } from '@models/bank-deposit.model';

@Component({
  selector: 'app-bank-deposit-item',
  templateUrl: './bank-deposit-item.component.html',
  styleUrls: ['./bank-deposit-item.component.css'],
})
export class BankDepositItemComponent {
  @Input({ required: true }) bankDeposit!: IBankDepositDto;
}
