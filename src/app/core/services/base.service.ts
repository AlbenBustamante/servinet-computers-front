import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  readonly cashBase = [
    { title: 'oneHundredThousand', value: 100000 },
    { title: 'fiftyThousand', value: 50000 },
    { title: 'twentyThousand', value: 20000 },
    { title: 'tenThousand', value: 10000 },
    { title: 'fiveThousand', value: 5000 },
    { title: 'twoThousand', value: 2000 },
    { title: 'oneThousand', value: 1000 },
    { title: 'fiveHundred', value: 500 },
    { title: 'twoHundred', value: 200 },
    { title: 'oneHundred', value: 100 },
    { title: 'fifty', value: 50 },
  ];

  constructor() {}
}
