import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loading = signal<boolean>(false);
  private _count = 0;

  constructor() {}

  setLoading(loading: boolean) {
    if (loading) {
      this._count++;
    } else {
      this._count--;
    }

    this._loading.set(this._count > 0);
  }

  get loading() {
    return this._loading.asReadonly();
  }
}
