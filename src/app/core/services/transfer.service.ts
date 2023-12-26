import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITransferReq, ITransferRes } from '../models/transfer.model';
import { Observable } from 'rxjs';
import { IPageResponse } from '../models/response.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private readonly url: string = `${environment.apiUrl}/transfers`;

  constructor(private readonly http: HttpClient) {}

  register(req: ITransferReq) {
    req.campusId = 1; // temporal
    return this.http.post<IPageResponse<ITransferRes>>(this.url, req, {
      context: checkToken(),
    });
  }

  get(transferId: number) {
    return this.http.get<IPageResponse<ITransferRes>>(
      `${this.url}/${transferId}`,
      { context: checkToken() }
    );
  }

  update(transferId: number, req: ITransferReq) {
    return this.http.patch<IPageResponse<ITransferRes>>(
      `${this.url}/${transferId}`,
      req,
      { context: checkToken() }
    );
  }

  delete(transferId: number) {
    return this.http.delete<Boolean>(`${this.url}/${transferId}`, {
      context: checkToken(),
    });
  }
}
