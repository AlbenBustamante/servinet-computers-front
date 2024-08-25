import { Component, inject } from '@angular/core';
import { PlatformTransferService } from '@services/platform-transfer.service';

@Component({
  selector: 'app-final-stats',
  templateUrl: './final-stats.component.html',
  styleUrls: ['./final-stats.component.css'],
})
export class FinalStatsComponent {
  private readonly transferService = inject(PlatformTransferService);
  readonly reports = this.transferService.reports;

  constructor() {}
}
