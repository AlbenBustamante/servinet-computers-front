import { DetailService } from '@admin/home/users/services/detail.service';
import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
})
export class MainStatsComponent {
  readonly journeys;
  readonly loading;
  readonly average = computed(() => {
    const journeys = this.journeys();
    const days = journeys?.journeys.length;
    const transactions = journeys?.totalOfTransactions;

    if (!days || !transactions) {
      return 0;
    }

    return (transactions / days).toFixed(1);
  });

  constructor(private readonly service: DetailService) {
    this.journeys = this.service.journeys;
    this.loading = this.service.loading;
  }
}
