import { CurrencyPipe, formatCurrency, formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { CashRegisterDetailStatus, CashRegisterStatus } from '@models/enums';
import { CashRegisterDetailStatusPipe } from '@shared/pipes/cash-register-detail-status.pipe';
import { CashRegisterStatusPipe } from '@shared/pipes/cash-register-status.pipe';

@Component({
  selector: 'app-detail-stat-inline',
  templateUrl: './detail-stat-inline.component.html',
})
export class DetailStatInlineComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) stat!:
    | undefined
    | number
    | string
    | Date
    | CashRegisterStatus
    | CashRegisterDetailStatus;
  @Input({ required: true }) pipe!:
    | undefined
    | 'currency'
    | 'time'
    | 'date'
    | 'cashRegister'
    | 'cashRegisterDetail';

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedStat() {
    if (!this.stat) {
      return '--';
    }

    if (this.pipe === 'currency') {
      return new CurrencyPipe(this.locale).transform(
        this.stat as number,
        '$',
        'symbol',
        '0.00'
      );
    }

    if (this.pipe === 'time') {
      return formatDate(this.stat as Date, 'hh:mm a', this.locale);
    }

    if (this.pipe === 'date') {
      return formatDate(this.stat as Date, 'dd-MM-yyyy', this.locale);
    }

    if (this.pipe === 'cashRegister') {
      return new CashRegisterStatusPipe().transform(
        this.stat as CashRegisterStatus
      );
    }

    if (this.pipe === 'cashRegisterDetail') {
      return new CashRegisterDetailStatusPipe().transform(
        this.stat as CashRegisterDetailStatus
      );
    }

    return this.stat;
  }
}
