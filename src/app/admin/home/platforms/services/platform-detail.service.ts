import { Injectable, signal } from '@angular/core';
import { IAdminPlatformDto } from '@models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformDetailService {
  readonly loading = signal<boolean>(false);
  readonly details = signal<IAdminPlatformDto | undefined>(undefined);
  readonly date = signal<Date>(new Date());

  constructor() {}
}
