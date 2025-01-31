export interface IBase {
  hundredThousand: number;
  fiftyThousand: number;
  twentyThousand: number;
  tenThousand: number;
  fiveThousand: number;
  twoThousand: number;
  thousand: number;
  fiveHundred: number;
  twoHundred: number;
  hundred: number;
  fifty: number;
}

export interface IBaseDetail {
  amount: number;
  total: number;
}

export interface ICalculatorBase {
  billet: IBaseDetail;
  coin: IBaseDetail;
  total: IBaseDetail;
}
