import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IUserReq, IUserRes } from '@models/user.model';
import { IPageResponse } from '@models/response.model';
import { IDashboardResponse } from '@models/dashboard.model';
import { TokenService } from './token.service';

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
    return this.http.patch<IUserRes>(
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

  getReport() {
    return this.http.get<IDashboardResponse>(
      `${this.url}/${this.tokenService.getInfo().id}/reports`,
      { context: checkToken() }
    );
  }
}
