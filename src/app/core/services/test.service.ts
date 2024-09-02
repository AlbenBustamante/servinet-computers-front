import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private readonly url = `${environment.apiUrl}/test`;

  constructor(private readonly http: HttpClient) {}

  pong() {
    return this.http.get<void>(`${this.url}/pong`);
  }
}
