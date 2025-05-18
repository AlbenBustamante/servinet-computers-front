import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { PlatformDetailService } from '../services/platform-detail.service';
import { UpdateBalancesModalComponent } from '../components/update-balances-modal/update-balances-modal.component';
import { NewPlatformTransferModalComponent } from '../components/new-platform-transfer-modal/new-platform-transfer-modal.component';

@Component({
  selector: 'app-platform-details',
  templateUrl: './platform-details.component.html',
  styleUrls: ['./platform-details.component.css'],
})
export class PlatformDetailsComponent {
  @ViewChild(UpdateBalancesModalComponent)
  balancesModal!: UpdateBalancesModalComponent;
  @ViewChild(NewPlatformTransferModalComponent)
  transferModal!: NewPlatformTransferModalComponent;

  readonly today = new Date().toISOString().slice(0, 10);
  readonly loading;
  readonly details;
  readonly date;
  readonly empty;

  constructor(
    private readonly platformDetailService: PlatformDetailService,
    private readonly platformService: PlatformService,
    private readonly route: ActivatedRoute
  ) {
    this.loading = this.platformDetailService.loading;
    this.details = this.platformDetailService.details;
    this.date = this.platformDetailService.date;
    this.empty = this.platformDetailService.empty;
  }

  ngOnInit() {
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const date = this.date().toISOString().slice(0, 10);

    this.getDetails(id, date);
  }

  onChangeDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const [year, month, day] = target.value.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    this.date.set(date);
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const dateStr = date.toISOString().slice(0, 10);

    this.getDetails(id, dateStr);
  }

  private getDetails(id: number, dateStr: string) {
    this.platformService.getDetails(id, dateStr).subscribe({
      next: (details) => {
        this.details.set(details);
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
