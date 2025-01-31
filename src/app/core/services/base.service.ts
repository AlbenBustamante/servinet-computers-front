import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBaseDetail, ICalculatorBase } from '@models/base.model';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  defaultBase() {
    return [
      { title: 'hundredThousand', value: 100000, total: 0 },
      { title: 'fiftyThousand', value: 50000, total: 0 },
      { title: 'twentyThousand', value: 20000, total: 0 },
      { title: 'tenThousand', value: 10000, total: 0 },
      { title: 'fiveThousand', value: 5000, total: 0 },
      { title: 'twoThousand', value: 2000, total: 0 },
      { title: 'thousand', value: 1000, total: 0 },
      { title: 'fiveHundred', value: 500, total: 0 },
      { title: 'twoHundred', value: 200, total: 0 },
      { title: 'hundred', value: 100, total: 0 },
      { title: 'fifty', value: 50, total: 0 },
    ];
  }

  readonly cashBase = signal(this.defaultBase());

  calculate(baseForm: FormGroup): ICalculatorBase {
    const billet = this.calculateByRange(0, 6, baseForm);
    const coin = this.calculateByRange(6, this.cashBase().length, baseForm);

    const resAmount = billet.amount + coin.amount;
    const resTotal = billet.total + coin.total;
    const total: IBaseDetail = { amount: resAmount, total: resTotal };

    return { billet, coin, total };
  }

  private calculateByRange(
    startValue: number,
    endValue: number,
    baseForm: FormGroup
  ): IBaseDetail {
    let amount = 0;
    let total = 0;

    for (let i = startValue; i < endValue; i++) {
      const resAmount = Number(baseForm.get(this.cashBase()[i].title)?.value);
      const resTotal = resAmount * this.cashBase()[i].value;

      this.cashBase()[i].total = resTotal;

      amount += resAmount;
      total += resTotal;
    }

    return { amount, total };
  }

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
