import { CurrencyPipe } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-balance-stat',
  templateUrl: './balance-stat.component.html',
})
export class BalanceStatComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: number | undefined;
  @Input() currency: boolean = true;

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedValue() {
    if (this.currency) {
      return new CurrencyPipe(this.locale).transform(
        this.value,
        '$',
        'symbol',
        '0.00'
      );
    }

    return this.value;
  }
}
