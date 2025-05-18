import { Component, signal, ViewChild } from '@angular/core';
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

  readonly loading;
  readonly details;
  readonly month = signal<string>('');

  constructor(
    private readonly platformDetailService: PlatformDetailService,
    private readonly platformService: PlatformService,
    private readonly route: ActivatedRoute
  ) {
    this.loading = this.platformDetailService.loading;
    this.details = this.platformDetailService.details;
  }

  ngOnInit() {
    this.loading.set(true);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.month.set(new Date().toISOString().slice(0, 7));

    this.platformService.getDetails(id, this.month()).subscribe({
      next: (details) => {
        this.details.set(details);
        const balances = details.balances[0];

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
