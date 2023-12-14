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

  updatePlatforms(
    platformNames: string[]
  ): Observable<IPageResponse<ICampusRes>> {
    const arrayParam = platformNames.join(',');

    const params = new HttpParams().set('platformNames', arrayParam);

    return this.http.put<IPageResponse<ICampusRes>>(
      `${this.url}/${1}/platforms`,
      undefined,
      { params }
    );
  }

  getTransfers(
    campusId: number,
    pageReq: IPagination
  ): Observable<IPageResponse<ITransferRes>> {
    let params = new HttpParams();
    const { size, direction, startDate, endDate, page, property } = pageReq;

    if (size) {
      params = params.append('size', size);
    }

    if (direction) {
      params = params.append('direction', direction);
    }

    if (startDate) {
      params = params.append('startDate', startDate.toString());
    }

    if (endDate) {
      params = params.append('endDate', endDate.toString());
    }

    if (page) {
      params = params.append('page', page);
    }

    if (property) {
      params = params.append('property', property);
    }

    return this.http.get<IPageResponse<ITransferRes>>(
      `${this.url}/${campusId}/transfers`,
      { params }
    );
  }
}
