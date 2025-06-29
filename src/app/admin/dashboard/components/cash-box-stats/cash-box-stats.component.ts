import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { PlatformsModalComponent } from '@admin/dashboard/components/platforms-modal/platforms-modal.component';
import { CashRegistersModalComponent } from '@admin/dashboard/components/cash-registers-modal/cash-registers-modal.component';
import { SafesStatsModalComponent } from '@admin/dashboard/components/safes-stats-modal/safes-stats-modal.component';

@Component({
  selector: 'app-cash-box-stats',
  templateUrl: './cash-box-stats.component.html',
})
export class CashBoxStatsComponent {
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
