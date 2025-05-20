import { Component, computed, Inject, LOCALE_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { CashRegisterService } from '@services/cash-register.service';
import { DetailService } from '../services/detail.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  private readonly id: number;
  readonly loading;
  readonly detail;
  readonly title = computed(
    () => `Caja Registradora N° ${this.detail()?.cashRegister.numeral ?? 0}`
  );
  readonly today = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  readonly date;

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly route: ActivatedRoute,
    private readonly service: DetailService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = this.service.loading;
    this.detail = this.service.detail;
    this.date = this.service.date;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getLastDetail(this.id).subscribe({
      next: (detail) => {
        this.detail.set(detail);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  onChangeDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const [year, month, day] = target.value.split('-').map(Number);
    const newDate = new Date(year, month - 1, day);
    this.date.set(newDate);
  }
}
