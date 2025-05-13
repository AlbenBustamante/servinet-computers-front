import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IAvailableTransfersDto,
  ICashTransferDto,
  ICreateCashTransferDto,
} from '@models/cash-transfer.model';
import { IPageResponse } from '@models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CashTransferService {
  private readonly url = `${environment.apiUrl}/cash-transfers`;

  constructor(private readonly http: HttpClient) {}

  register(createTransferDto: ICreateCashTransferDto) {
    return this.http.post<IPageResponse<ICashTransferDto>>(
      this.url,
      createTransferDto,
      { context: checkToken() }
    );
  }

  getAvailableTransfers() {
    return this.http.get<IAvailableTransfersDto>(this.url, {
      context: checkToken(),
    });
  }

  delete(
    cashTransferId: number,
    cashRegisterDetailId: number,
    tempCode: string
  ) {
    const params = new HttpParams()
      .append('cashRegisterDetailId', cashRegisterDetailId)
      .append('tempCode', Number(tempCode));

    return this.http.delete<void>(`${this.url}/${cashTransferId}`, {
      params,
      context: checkToken(),
    });
  }
}
