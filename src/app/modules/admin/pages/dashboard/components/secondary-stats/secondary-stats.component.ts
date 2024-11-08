import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { PlatformsModalComponent } from '../platforms-modal/platforms-modal.component';

@Component({
  selector: 'app-secondary-stats',
  templateUrl: './secondary-stats.component.html',
  styleUrls: ['./secondary-stats.component.css'],
})
export class SecondaryStatsComponent {
  @ViewChild(PlatformsModalComponent) platformsModal!: PlatformsModalComponent;
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }

  openPlatforms() {
    this.platformsModal.open();
  }
}
