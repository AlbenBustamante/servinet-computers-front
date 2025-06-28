import { Injectable, signal } from '@angular/core';
import {
  IAdminPlatformDto,
  IPlatformTransferRes,
} from '@models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  readonly loading = signal<boolean>(false);
  readonly details = signal<IAdminPlatformDto | undefined>(undefined);
  readonly transfers = signal<IPlatformTransferRes[]>([]);
  readonly date = signal<Date>(new Date());
  readonly empty = signal<boolean>(true);
}
