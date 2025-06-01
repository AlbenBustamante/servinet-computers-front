import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeService } from '@services/safe.service';
import { DetailService } from '../services/detail.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  readonly id;
  readonly loading;
  readonly details;
  readonly date;

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly route: ActivatedRoute,
    private readonly safeService: SafeService,
    private readonly detailService: DetailService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = this.detailService.loading;
    this.details = this.detailService.details;
    this.date = this.detailService.date;
  }

  ngOnInit() {
    this.loading.set(true);

    const date = this.formatDate(this.date());

    this.safeService.getMovements(this.id, date).subscribe({
      next: (details) => {
        this.details.set(details);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  private formatDate(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }
}
