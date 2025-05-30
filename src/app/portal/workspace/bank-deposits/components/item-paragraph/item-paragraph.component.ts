import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-item-paragraph',
  templateUrl: './item-paragraph.component.html',
})
export class ItemParagraphComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: string | number | Date;
  @Input() pipe: 'default' | 'currency' | 'time' = 'default';

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedValue() {
    if (this.pipe === 'time') {
      return new DatePipe(this.locale).transform(this.value as Date, 'HH:mm a');
    }

    if (this.pipe === 'currency') {
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
