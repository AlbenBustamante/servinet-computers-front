import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITransferReq, ITransferRes } from '../models/transfer.model';
import { Observable } from 'rxjs';
import { IPageResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private readonly url: string = `${environment.apiUrl}/transfers`;

  constructor(private readonly http: HttpClient) {}

  register(req: ITransferReq): Observable<IPageResponse<ITransferRes>> {
    req.campusId = 1; // temporal
    return this.http.post<IPageResponse<ITransferRes>>(this.url, req);
  }

  get(transferId: number): Observable<IPageResponse<ITransferRes>> {
    return this.http.get<IPageResponse<ITransferRes>>(
      `${this.url}/${transferId}`
    );
  }

  update(
    transferId: number,
    req: ITransferReq
  ): Observable<IPageResponse<ITransferRes>> {
    return this.http.patch<IPageResponse<ITransferRes>>(
      `${this.url}/${transferId}`,
      req
    );
  }

  delete(transferId: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/${transferId}`);
  }
}
