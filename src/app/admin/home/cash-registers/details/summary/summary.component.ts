import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashRegisterService } from '@services/cash-register.service';
import { DetailService } from '@admin/home/cash-registers/details/services/detail.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent {
  private readonly id: number;
  readonly loading;
  readonly details;
  readonly selectedDetail;
  readonly title = computed(
    () =>
      `Caja Registradora N° ${this.selectedDetail()?.cashRegister.numeral ?? 0}`
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
    this.details = this.service.details;
    this.selectedDetail = this.service.selectedDetail;
    this.date = this.service.date;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getMovements(this.id).subscribe({
      next: (details) => {
        if (details.length > 0) {
          this.selectedDetail.set(details[0]);
        }

        this.details.set(details);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  setSelectedDetail(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);

    const index = this.details().findIndex((detail) => detail.id === value);

    if (index > -1) {
      this.selectedDetail.set(this.details()[index]);
    }
  }

  onChangeDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const [year, month, day] = target.value.split('-').map(Number);
    const newDate = new Date(year, month - 1, day);
    this.date.set(newDate);
  }
}
