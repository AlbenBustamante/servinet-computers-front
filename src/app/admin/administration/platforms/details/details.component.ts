import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { DetailService } from '@admin/administration/platforms/services/detail.service';
import { formatDate } from '@angular/common';
import { NewPlatformTransferModalComponent } from './components/new-platform-transfer-modal/new-platform-transfer-modal.component';
import { UpdateBalancesModalComponent } from './components/update-balances-modal/update-balances-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  @ViewChild(UpdateBalancesModalComponent)
  balancesModal!: UpdateBalancesModalComponent;
  @ViewChild(NewPlatformTransferModalComponent)
  transferModal!: NewPlatformTransferModalComponent;

  readonly today = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  readonly transfers;
  readonly loading;
  readonly details;
  readonly date;
  readonly empty;

  constructor(
    private readonly service: DetailService,
    private readonly platformService: PlatformService,
    private readonly route: ActivatedRoute,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    this.loading = this.service.loading;
    this.details = this.service.details;
    this.transfers = this.service.transfers;
    this.date = this.service.date;
    this.empty = this.service.empty;
  }

  ngOnInit() {
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const date = this.today;

    this.getDetails(id, date);
  }

  onChangeDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const [year, month, day] = target.value.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    this.date.set(date);
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const dateStr = formatDate(date, 'yyyy-MM-dd', this.locale);

    this.getDetails(id, dateStr);
  }

  private getDetails(id: number, dateStr: string) {
    this.platformService.getDetails(id, dateStr).subscribe({
      next: (details) => {
        this.details.set(details);
        this.transfers.set(details.transfers);

        const { initialBalance, finalBalance } = details.platform;

        this.balancesModal.form.patchValue({
          initialBalance,
          finalBalance,
        });

        this.empty.set(false);
        this.loading.set(false);
      },
      error: (err) => {
        this.empty.set(true);
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
