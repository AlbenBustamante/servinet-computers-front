import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IBankDepositDto,
  ICreateBankDepositDto,
} from '@models/bank-deposit.model';

@Injectable({
  providedIn: 'root',
})
export class BankDepositService {
  private readonly url = `${environment.apiUrl}/bank-deposits`;

  constructor(private readonly http: HttpClient) {}

  create(createBankDepositDto: ICreateBankDepositDto) {
    return this.http.post<IBankDepositDto>(this.url, createBankDepositDto, {
      context: checkToken(),
    });
  }

  getAllBetween(startDate?: Date, endDate?: Date) {
    let params = new HttpParams();

    if (startDate) {
      params = params.append('startDate', startDate.toUTCString());
    }

    if (endDate) {
      params = params.append('endDate', endDate.toUTCString());
    }

    return this.http.get<IBankDepositDto[]>(this.url, {
      params,
      context: checkToken(),
    });
  }
}
