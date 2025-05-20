import { formatCurrency, formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-detail-stat-wrapper',
  templateUrl: './detail-stat-wrapper.component.html',
  styleUrls: ['./detail-stat-wrapper.component.css'],
})
export class DetailStatWrapperComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) stat!: undefined | number | Date;
  @Input({ required: true }) pipe!: undefined | 'currency' | 'time';

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedStat() {
    if (!this.stat) {
      return '--';
    }

    if (this.pipe === 'currency') {
      return formatCurrency(this.stat as number, this.locale, '$', '0.00');
    }

    if (this.pipe === 'time') {
      return formatDate(this.stat as Date, 'HH:mm a', this.locale);
    }

    return this.stat;
  }
}
