import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IPlatformTransferReq,
  IPlatformTransferRes,
  IUpdatePlatformTransferDto,
} from '@models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformTransferService {
  private readonly url: string = `${environment.apiUrl}/platform-transfers`;
  readonly vouchers = signal<File[]>([]);

  reports = computed(() => {});

  constructor(private readonly http: HttpClient) {}

  register(req: IPlatformTransferReq) {
    const formData = new FormData();

    this.vouchers().forEach((voucher) =>
      formData.append('vouchers', voucher, voucher.name)
    );

    formData.append('request', JSON.stringify(req));

    return this.http.post<IPlatformTransferRes>(this.url, formData, {
      context: checkToken(),
    });
  }

  get(transferId: number) {
    return this.http.get<IPlatformTransferRes>(`${this.url}/${transferId}`, {
      context: checkToken(),
    });
  }

  update(transferId: number, dto: IUpdatePlatformTransferDto) {
    return this.http.patch<IPlatformTransferRes>(
      `${this.url}/${transferId}`,
      dto,
      { context: checkToken() }
    );
  }

  delete(transferId: number) {
    return this.http.delete<Boolean>(`${this.url}/${transferId}`, {
      context: checkToken(),
    });
  }
}
