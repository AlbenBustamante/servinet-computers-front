import { Component, inject } from '@angular/core';
import { TransferService } from '@services/transfer.service';

@Component({
  selector: 'app-final-stats',
  templateUrl: './final-stats.component.html',
  styleUrls: ['./final-stats.component.css'],
})
export class FinalStatsComponent {
  private readonly transferService = inject(TransferService);
  readonly reports = this.transferService.reports;

  constructor() {}
}
