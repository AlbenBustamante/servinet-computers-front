import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUserReq, IUserRes } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { IPageResponse } from '../models/response.model';
import { ICampusRes } from '../models/campus.model';
import { checkToken } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';
import { IDashboardResponse } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = `${environment.apiUrl}/users`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  update(req: IUserReq) {
    return this.http.patch<IPageResponse<IUserRes>>(
      `${this.url}/${this.tokenService.getInfo().id}`,
      req,
      { context: checkToken() }
    );
  }

  delete() {
    return this.http.delete<Boolean>(
      `${this.url}/${this.tokenService.getInfo().id}`,
      { context: checkToken() }
    );
  }

  getCampuses() {
    return this.http.get<IPageResponse<ICampusRes>>(
      `${this.url}/${this.tokenService.getInfo().id}/campuses`,
      { context: checkToken() }
    );
  }

  getReport() {
    return this.http.get<IDashboardResponse>(
      `${this.url}/${this.tokenService.getInfo().id}/reports`,
      { context: checkToken() }
    );
  }
}
