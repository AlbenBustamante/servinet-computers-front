import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { PlatformsModalComponent } from '../platforms-modal/platforms-modal.component';
import { CashRegistersModalComponent } from '../cash-registers-modal/cash-registers-modal.component';
import { SafesStatsModalComponent } from '../safes-stats-modal/safes-stats-modal.component';

@Component({
  selector: 'app-secondary-stats',
  templateUrl: './secondary-stats.component.html',
  styleUrls: ['./secondary-stats.component.css'],
})
export class SecondaryStatsComponent {
  @ViewChild(PlatformsModalComponent) platformsModal!: PlatformsModalComponent;
  @ViewChild(CashRegistersModalComponent)
  cashRegistersModal!: CashRegistersModalComponent;
  @ViewChild(SafesStatsModalComponent) safesModal!: SafesStatsModalComponent;
  readonly dashboard;

  constructor(private readonly dashboardService: DashboardService) {
    this.dashboard = this.dashboardService.dashboard;
  }

  openPlatforms() {
    this.platformsModal.open();
  }

  openCashRegisters() {
    this.cashRegistersModal.open();
  }

  openSafes() {
    this.safesModal.open();
  }
}
