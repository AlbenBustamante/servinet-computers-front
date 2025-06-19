import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent {
  private readonly id: number;
  readonly loading;
  readonly today = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  readonly date;

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly route: ActivatedRoute,
    private readonly service: DetailService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('detailId'));
    this.loading = this.service.loading;
    this.date = this.service.date;
  }
}
