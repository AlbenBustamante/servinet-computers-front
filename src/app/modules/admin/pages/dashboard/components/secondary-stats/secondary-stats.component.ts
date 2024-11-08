import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';

@Component({
  selector: 'app-secondary-stats',
  templateUrl: './secondary-stats.component.html',
  styleUrls: ['./secondary-stats.component.css'],
})
export class SecondaryStatsComponent {
  @ViewChild('platformsModal') platformsModal!: ElementRef<HTMLDialogElement>;
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }

  openPlatforms() {
    this.platformsModal.nativeElement.showModal();
  }

  closePlatforms() {
    this.platformsModal.nativeElement.close();
  }
}
