import { Injectable, signal } from '@angular/core';
import { IJourneyDto } from '@models/journey.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly loading = signal<boolean>(false);
  readonly journeys = signal<IJourneyDto[]>([]);

  constructor() {}
}
