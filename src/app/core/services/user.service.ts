import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUserReq, IUserRes } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPageResponse } from '../models/response.model';
import { ICampusRes } from '../models/campus.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) {}

  update(userId: number, req: IUserReq) {
    return this.http.patch<IPageResponse<IUserRes>>(
      `${this.url}/${userId}`,
      req,
      { context: checkToken() }
    );
  }

  delete(userId: number) {
    return this.http.delete<Boolean>(`${this.url}/${userId}`, {
      context: checkToken(),
    });
  }

  getCampuses(userId: number) {
    return this.http.get<IPageResponse<ICampusRes>>(
      `${this.url}/${userId}/campuses`,
      { context: checkToken() }
    );
  }
}
