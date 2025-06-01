import { CurrencyPipe } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-journey-stat',
  templateUrl: './journey-stat.component.html',
})
export class JourneyStatComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: string | number | undefined;
  @Input() currency: boolean = false;

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedValue() {
    if (this.currency) {
      return new CurrencyPipe(this.locale).transform(
        this.value as number,
        '$',
        'symbol',
        '0.00'
      );
    }

    return this.value;
  }
}
