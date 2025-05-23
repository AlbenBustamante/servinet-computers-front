import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { DetailService } from '@admin/home/platforms/services/detail.service';
import { UpdateBalancesModalComponent } from '@admin/home/platforms/components/update-balances-modal/update-balances-modal.component';
import { NewPlatformTransferModalComponent } from '@admin/home/platforms/components/new-platform-transfer-modal/new-platform-transfer-modal.component';
import { formatDate } from '@angular/common';

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

        const balances = details.balances[0];
        this.empty.set(balances === undefined);

        this.balancesModal.form.patchValue({
          initialBalance: balances?.initialBalance,
          finalBalance: balances?.finalBalance,
        });

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
