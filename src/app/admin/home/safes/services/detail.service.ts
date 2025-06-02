import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, signal } from '@angular/core';
import { ISafeDetailRes } from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  readonly loading = signal<boolean>(false);
  readonly details = signal<ISafeDetailRes | undefined>(undefined);
  readonly date = signal<Date>(new Date());
  readonly today = this.formatDate(new Date());

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  formatDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }
}
