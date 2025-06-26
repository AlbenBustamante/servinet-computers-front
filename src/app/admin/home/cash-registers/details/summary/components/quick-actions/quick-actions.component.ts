import { Component, computed } from '@angular/core';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
  readonly reports;

  readonly closed = computed(() => {
    const reports = this.reports();

    if (!reports) {
      return false;
    }

    const { finalWorking, finalBase } = reports.reports.cashRegisterDetail;

    return finalWorking !== null && finalBase !== null;
  });

  constructor(private readonly service: DetailService) {
    this.reports = this.service.reports;
  }
}
