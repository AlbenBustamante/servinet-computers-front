import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { IReportsRes, IUpdateUserDto, IUserRes } from '@models/user.model';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IJourneyDetailDto } from '@models/journey.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url: string = `${environment.apiUrl}/users`;
  readonly users = signal<IUserRes[]>([]);
  readonly updateUserForm: FormGroup;
  readonly userToUpdateId = signal<number>(-1);
  readonly userToUpdateLoading = signal<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder
  ) {
    this.updateUserForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getAll() {
    return this.http
      .get<IUserRes[]>(this.url, { context: checkToken() })
      .pipe(tap((res) => this.users.set(res)));
  }

  getJourneys(userId: number, month: string) {
    const params = new HttpParams().append('month', month);

    return this.http.get<IJourneyDetailDto>(`${this.url}/${userId}/journeys`, {
      params,
      context: checkToken(),
    });
  }

  exportJourneysToExcel(userId: number, month: string) {
    const params = new HttpParams().append('month', month);

    return this.http.get(`${this.url}/${userId}/journeys/excel`, {
      params,
      context: checkToken(),
      responseType: 'blob',
    });
  }

  getReports() {
    return this.http.get<IReportsRes>(`${this.url}/reports`, {
      context: checkToken(),
    });
  }

  update(userId: number, dto: IUpdateUserDto) {
    return this.http
      .patch<IUserRes>(`${this.url}/${userId}`, dto, {
        context: checkToken(),
      })
      .pipe(
        tap((user) =>
          this.users.update((prevUsers) => {
            const index = prevUsers.findIndex((u) => u.id === user.id);

            if (index > -1) {
              prevUsers[index] = user;
            }

            return prevUsers;
          })
        )
      );
  }

  delete(userId: number) {
    return this.http
      .delete<Boolean>(`${this.url}/${userId}`, {
        context: checkToken(),
      })
      .pipe(
        tap((_) =>
          this.users.update((prevUsers) => {
            const index = prevUsers.findIndex((u) => u.id === userId);

            if (index > -1) {
              prevUsers.splice(index, 1);
            }

            return prevUsers;
          })
        )
      );
  }
}
