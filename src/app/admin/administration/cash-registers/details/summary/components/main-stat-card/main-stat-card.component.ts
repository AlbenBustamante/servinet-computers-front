import { formatCurrency } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-main-stat-card',
  templateUrl: './main-stat-card.component.html',
})
export class MainStatCardComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) stat!: number | undefined;
  @Input() color: 'neutral' | 'red' | 'green' | 'violet' = 'neutral';
  @Input() currency: boolean = true;

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedStat() {
    if (!this.currency) {
      return this.stat;
    }

    return formatCurrency(this.stat ?? 0, this.locale, '$', undefined, '0.00');
  }

  get wrapperColor() {
    return `shadow-${this.color}-300`;
  }

  get textColor() {
    return `text-${this.color}-700`;
  }
}
