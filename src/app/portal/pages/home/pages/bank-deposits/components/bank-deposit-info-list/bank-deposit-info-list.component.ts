import { Component, Input } from '@angular/core';
import { IBankDepositDto } from '@models/bank-deposit.model';

@Component({
  selector: 'app-bank-deposit-info-list',
  templateUrl: './bank-deposit-info-list.component.html',
  styleUrls: ['./bank-deposit-info-list.component.css'],
})
export class BankDepositInfoListComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) bankDeposit!: IBankDepositDto | undefined;
  @Input({ required: true }) type!: 'depositor' | 'payment';

  get empty() {
    if (!this.bankDeposit) {
      return false;
    }

    if (this.type === 'depositor') {
      return this.bankDeposit.depositors.length === 0;
    }

    return this.bankDeposit.payments.length === 0;
  }

  get formattedHeadline() {
    return this.empty ? `Sin ${this.headline.toLowerCase()}` : this.headline;
  }
}
