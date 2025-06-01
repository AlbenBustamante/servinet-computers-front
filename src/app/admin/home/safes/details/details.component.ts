import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
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
  readonly today = this.formatDate(new Date());

  readonly title = computed(() => {
    const details = this.details();
    return `Caja Fuerte N° ${details?.safe.numeral}`;
  });

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
    const date = this.formatDate(this.date());
    this.loading.set(true);

    this.safeService.getMovements(this.id, date).subscribe({
      next: (details) => {
        console.log({ details });
        this.details.set(details);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const [year, month, date] = target.value.split('-').map(Number);
    const newDate = new Date(year, month - 1, date);
    this.date.set(newDate);

    this.loading.set(true);

    this.safeService.getMovements(this.id, this.formatDate(newDate)).subscribe({
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
