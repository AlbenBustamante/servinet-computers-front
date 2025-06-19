import { formatDate } from '@angular/common';
import {
  Component,
  computed,
  Inject,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CashRegisterService } from '@services/cash-register.service';
import { DetailService } from '../services/detail.service';
import { DatePickerModalComponent } from './components/date-picker-modal/date-picker-modal.component';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
})
export class MovementsComponent {
  @ViewChild(DatePickerModalComponent)
  datePickerModal!: DatePickerModalComponent;

  private readonly id: number;
  readonly loading;
  readonly details;

  readonly title = computed(() => {
    const details = this.details();

    if (!details || details.length < 1) {
      return 'Caja Registradora';
    }

    return `Caja Registradora N° ${details[0].cashRegister.numeral}`;
  });

  readonly today = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  readonly date;

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly route: ActivatedRoute,
    private readonly service: DetailService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.cashRegisterId = this.id;
    this.loading = this.service.loading;
    this.details = this.service.details;
    this.date = this.service.date;
  }

  ngOnInit() {
    this.loading.set(true);

    const date = formatDate(this.date(), 'yyyy-MM-dd', this.locale);

    this.cashRegisterService.getMovements(this.id, date).subscribe({
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
}
