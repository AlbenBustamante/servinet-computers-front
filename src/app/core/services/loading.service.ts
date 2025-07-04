import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loading = signal<boolean>(false);

  constructor() {}

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  get loading() {
    return this._loading;
  }
}
