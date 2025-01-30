import { Injectable, signal } from '@angular/core';
import { IBase } from '@models/base.model';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  readonly defaultBase = [
    { title: 'hundredThousand', value: 100000, total: '0' },
    { title: 'fiftyThousand', value: 50000, total: '0' },
    { title: 'twentyThousand', value: 20000, total: '0' },
    { title: 'tenThousand', value: 10000, total: '0' },
    { title: 'fiveThousand', value: 5000, total: '0' },
    { title: 'twoThousand', value: 2000, total: '0' },
    { title: 'thousand', value: 1000, total: '0' },
    { title: 'fiveHundred', value: 500, total: '0' },
    { title: 'twoHundred', value: 200, total: '0' },
    { title: 'hundred', value: 100, total: '0' },
    { title: 'fifty', value: 50, total: '0' },
  ];

  readonly cashBase = signal(this.defaultBase);

  // static empty: IBase = {
  //   hundredThousand: 0,
  //   fiftyThousand: 0,
  //   twentyThousand: 0,
  //   tenThousand: 0,
  //   fiveThousand: 0,
  //   twoThousand: 0,
  //   thousand: 0,
  //   fiveHundred: 0,
  //   twoHundred: 0,
  //   hundred: 0,
  //   fifty: 0,
  // };

  constructor() {}
}
