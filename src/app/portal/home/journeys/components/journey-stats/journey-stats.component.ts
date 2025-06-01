import { Component, Input } from '@angular/core';
import { IJourneyDetailDto } from '@models/journey.model';

@Component({
  selector: 'app-journey-stats',
  templateUrl: './journey-stats.component.html',
})
export class JourneyStatsComponent {
  @Input({ required: true }) journeys!: IJourneyDetailDto | undefined;
}
