import { Injectable, signal } from '@angular/core';
import { ISafeDetailRes } from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  readonly loading = signal<boolean>(false);
  readonly details = signal<ISafeDetailRes | undefined>(undefined);
  readonly date = signal<Date>(new Date());

  constructor() {}
}
