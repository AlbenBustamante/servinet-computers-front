import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDateRange } from '@models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  private readonly dateRangeSource = new BehaviorSubject<IDateRange>({});
  currentDateRange$ = this.dateRangeSource.asObservable();

  setDateRange(dateRange: IDateRange) {
    this.dateRangeSource.next(dateRange);
  }
}
