import { Injectable } from '@angular/core';
import { ICampusReq, ICampusRes } from '../models/campus.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPageResponse } from '../models/response.model';
import { ITransferRes } from '../models/transfer.model';
import { IPagination } from '../models/pagination.model';
import { checkToken } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CampusService {
  private readonly url: string = `${environment.apiUrl}/campuses`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  register(req: ICampusReq) {
    req.userId = this.tokenService.getInfo().id;
    return this.http.post<IPageResponse<ICampusRes>>(this.url, req, {
      context: checkToken(),
    });
  }

  get(campusId: number) {
    return this.http.get<IPageResponse<ICampusRes>>(`${this.url}/${campusId}`, {
      context: checkToken(),
    });
  }

  update(campusId: number, req: ICampusReq) {
    req.userId = this.tokenService.getInfo().id;
    return this.http.patch<IPageResponse<ICampusRes>>(
      `${this.url}/${campusId}`,
      req,
      { context: checkToken() }
    );
  }

  delete(campusId: number) {
    return this.http.delete<Boolean>(`${this.url}/${campusId}`, {
      context: checkToken(),
    });
  }

  updatePlatforms(campusId: number, platformNames: string[]) {
    const arrayParam = platformNames.join(',');

    const params = new HttpParams().set('platformNames', arrayParam);

    return this.http.put<IPageResponse<ICampusRes>>(
      `${this.url}/${campusId}/platforms`,
      null,
      { params, context: checkToken() }
    );
  }

  getTransfers(pageReq: IPagination) {
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
      `${this.url}/${this.tokenService.getInfo().id}/transfers`,
      { params, context: checkToken() }
    );
  }
}
