import { Injectable, signal } from '@angular/core';
import { IJourneyDetailDto } from '@models/journey.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly loading = signal<boolean>(false);
  readonly journeys = signal<IJourneyDetailDto | undefined>(undefined);

  constructor() {}
}
