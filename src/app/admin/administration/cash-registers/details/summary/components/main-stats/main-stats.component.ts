import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
})
export class MainStatsComponent {
  readonly reports;
  readonly loading;

  readonly headline = computed(() => {
    const reports = this.reports();

    if (!reports) {
      return '';
    }

    const { user, createdDate } = reports.reports.cashRegisterDetail;
    const { name, lastName, code } = user;

    const apertureDate = formatDate(
      createdDate,
      'dd/MM/yyyy hh:mm a',
      this.locale
    );

    return `[${apertureDate}] ${code}: ${name} ${lastName} `;
  });

  readonly discrepancy = computed(() => {
    const reports = this.reports();
    return reports?.reports.discrepancy ?? 0;
  });

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService
  ) {
    this.reports = this.service.reports;
    this.loading = this.service.loading;
  }
}
