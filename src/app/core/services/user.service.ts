import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUserReq, IUserRes } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPageResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) {}

  register(req: IUserReq): Observable<IPageResponse<IUserRes>> {
    return this.http.post<IPageResponse<IUserRes>>(this.url, req);
  }

  update(userId: number, req: IUserReq): Observable<IPageResponse<IUserRes>> {
    return this.http.patch<IPageResponse<IUserRes>>(
      `${this.url}/${userId}`,
      req
    );
  }

  delete(userId: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${this.url}/${userId}`);
  }

  getCampuses(userId: number): Observable<IPageResponse<IUserRes>> {
    return this.http.get<IPageResponse<IUserRes>>(
      `${this.url}/${userId}/campuses`
    );
  }
}
