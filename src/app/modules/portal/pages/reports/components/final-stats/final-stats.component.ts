import { formatNumber } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CampusService } from '@services/campus.service';
import { TransferService } from '@services/transfer.service';

@Component({
  selector: 'app-final-stats',
  templateUrl: './final-stats.component.html',
  styleUrls: ['./final-stats.component.css'],
})
export class FinalStatsComponent {
  private readonly campusService = inject(CampusService);
  private readonly transferService = inject(TransferService);
  readonly transfers = this.campusService.transfers;
  readonly reports = this.transferService.reports;

  constructor() {}
}
