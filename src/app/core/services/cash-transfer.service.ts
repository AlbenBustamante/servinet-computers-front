import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IAvailableTransfersDto,
  ICashTransferDto,
  ICreateCashTransferDto,
} from '@models/cash-transfer.model';

@Injectable({
  providedIn: 'root',
})
export class CashTransferService {
  private readonly url = `${environment.apiUrl}/cash-transfers`;

  constructor(private readonly http: HttpClient) {}

  register(createTransferDto: ICreateCashTransferDto) {
    return this.http.post<ICashTransferDto>(this.url, createTransferDto, {
      context: checkToken(),
    });
  }

  getAvailableTransfers() {
    return this.http.get<IAvailableTransfersDto>(this.url, {
      context: checkToken(),
    });
  }
}
