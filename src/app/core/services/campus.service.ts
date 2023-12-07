import { Injectable } from '@angular/core';
import { ICampusReq, ICampusRes } from '../models/campus.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPageResponse } from '../models/response.model';
import { ITransferRes } from '../models/transfer.model';
import { IPagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class CampusService {
  private readonly url: string = `${environment.apiUrl}/campuses`;

  constructor(private readonly http: HttpClient) {}

  register(req: ICampusReq): Observable<IPageResponse<ICampusRes>> {
    req.userId = 3; // temporal
    return this.http.post<IPageResponse<ICampusRes>>(this.url, req);
  }

  get(campusId: number): Observable<IPageResponse<ICampusRes>> {
    return this.http.get<IPageResponse<ICampusRes>>(`${this.url}/${campusId}`);
  }

  update(
    campusId: number,
    req: ICampusReq
  ): Observable<IPageResponse<ICampusRes>> {
    return this.http.patch<IPageResponse<ICampusRes>>(
      `${this.url}/${campusId}`,
      req
    );
  }

  delete(campusId: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/${campusId}`);
  }

  addPlatform(
    campusId: number,
    platformName: string
  ): Observable<IPageResponse<ICampusRes>> {
    return this.http.post<IPageResponse<ICampusRes>>(
      `${this.url}/${campusId}/platform/${platformName}`,
      undefined
    );
  }

  removePlatform(
    campusId: number,
    platformName: string
  ): Observable<IPageResponse<ICampusRes>> {
    return this.http.delete<IPageResponse<ICampusRes>>(
      `${this.url}/${campusId}/platform/${platformName}`
    );
  }

  getTransfers(
    campusId: number,
    pageReq: IPagination
  ): Observable<IPageResponse<ITransferRes>> {
    const params = new HttpParams();
    const { size, direction, startDate, endDate, page, property } = pageReq;

    if (size) {
      params.append('size', size);
    }

    if (direction) {
      params.append('direction', direction);
    }

    if (startDate) {
      params.append('startDate', startDate.toUTCString());
    }

    if (endDate) {
      params.append('endDate', endDate.toUTCString());
    }

    if (page) {
      params.append('page', page);
    }

    if (property) {
      params.append('property', property);
    }

    return this.http.get<IPageResponse<ITransferRes>>(
      `${this.url}/${campusId}/transfers`,
      { params }
    );
  }
}
