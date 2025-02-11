import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IAvailableTransfersDto } from '@models/cash-transfer.model';

@Injectable({
  providedIn: 'root',
})
export class CashTransferService {
  private readonly url = `${environment.apiUrl}/cash-transfers`;

  constructor(private readonly http: HttpClient) {}

  getAvailableTransfers() {
    return this.http.get<IAvailableTransfersDto>(this.url, {
      context: checkToken(),
    });
  }
}
