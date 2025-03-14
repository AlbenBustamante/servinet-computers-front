import { Injectable, signal } from '@angular/core';
import { ISafeMovementDto } from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class SafeMovementService {
  readonly safeMovement = signal<ISafeMovementDto | undefined>(undefined);

  constructor() {}
}
