import { DatePipe } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-about-me-stat',
  templateUrl: './about-me-stat.component.html',
})
export class AboutMeStatComponent {
  @Input({ required: true }) stat!: string;
  @Input({ required: true }) value!: string | Date | undefined;
  @Input() dateTime: boolean = false;

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  get formattedValue() {
    if (this.dateTime) {
      return new DatePipe(this.locale).transform(
        this.value as Date,
        "EEE, dd 'de' MMM, yyyy hh:mm a"
      );
    }

    return this.value;
  }
}
