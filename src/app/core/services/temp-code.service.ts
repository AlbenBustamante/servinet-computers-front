import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { ITempCodeRes } from '@models/temp-code.model';

@Injectable({
  providedIn: 'root',
})
export class TempCodeService {
  private readonly url = `${environment.apiUrl}/temp_codes`;

  constructor(private readonly http: HttpClient) {}

  loadTempCode() {
    return this.http.get<ITempCodeRes>(`${this.url}/load`, {
      context: checkToken(),
    });
  }
}
