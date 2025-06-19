import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { DetailService } from '../../../services/detail.service';
import { formatDate } from '@angular/common';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
})
export class DatePickerModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly cashRegisterId;
  readonly date;
  readonly loading;
  readonly formattedDate;
  readonly details;

  constructor(
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly service: DetailService,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.date = this.service.date;
    this.loading = this.service.loading;
    this.formattedDate = formatDate(this.date(), 'yyyy-MM-dd', this.locale);
    this.cashRegisterId = this.service.cashRegisterId;
    this.details = this.service.details;
  }

  onChangeDate(event: Event) {
    this.loading.set(true);

    const target = event.target as HTMLInputElement;
    const [year, month, day] = target.value.split('-').map(Number);
    const newDate = new Date(year, month - 1, day);
    this.date.set(newDate);

    this.cashRegisterService
      .getMovements(
        this.cashRegisterId,
        formatDate(this.date(), 'yyyy-MM-dd', this.locale)
      )
      .subscribe({
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

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
