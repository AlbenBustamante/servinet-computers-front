import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IBankDepositDto,
  ICreateBankDepositPaymentDto,
} from '@models/bank-deposit.model';

@Injectable({
  providedIn: 'root',
})
export class BankDepositPaymentService {
  private readonly url = `${environment.apiUrl}/bank-deposit-payments`;

  constructor(private readonly http: HttpClient) {}

  create(dto: ICreateBankDepositPaymentDto) {
    return this.http.post<IBankDepositDto>(this.url, dto, {
      context: checkToken(),
    });
  }
}
