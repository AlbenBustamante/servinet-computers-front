import { formatDate } from '@angular/common';
import { Component, computed, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashRegisterService } from '@services/cash-register.service';
import { DetailService } from '../services/detail.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
})
export class MovementsComponent {
  private readonly id: number;
  readonly loading;
  readonly details;

  readonly title = computed(
    () =>
      `Caja Registradora N° ${this.details()?.[0].cashRegister.numeral ?? 0}`
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
    this.date = this.service.date;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getMovements(this.id).subscribe({
      next: (details) => {
        this.details.set(details);
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
