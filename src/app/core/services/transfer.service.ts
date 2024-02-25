import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { ITransferReq, ITransferRes } from '@models/transfer.model';
import { IPageResponse } from '@models/response.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private readonly url: string = `${environment.apiUrl}/transfers`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  register(req: ITransferReq) {
    req.campusId = this.tokenService.getInfo().id;
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
    req.campusId = this.tokenService.getInfo().id;
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
