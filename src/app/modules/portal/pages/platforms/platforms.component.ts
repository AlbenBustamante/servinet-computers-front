import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IPlatformBalanceReq,
  IPlatformBalanceRes,
  IPlatformTransferReq,
} from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { PlatformTransferService } from '@services/platform-transfer.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-portal-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  readonly loading = signal<boolean>(false);
  readonly voucherPicked = signal<File | null>(null);
  readonly transferForm: FormGroup;
  readonly editing: WritableSignal<boolean>;
  readonly selectedPlatformBalance: WritableSignal<IPlatformBalanceRes | null>;

  constructor(
    private readonly platformBalanceService: PlatformBalanceService,
    private readonly platformTransferService: PlatformTransferService,
    private readonly fb: FormBuilder
  ) {
    this.editing = this.platformBalanceService.editing;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;

    this.transferForm = this.fb.group({
      voucher: [null],
      value: ['', Validators.required, Validators.min(1)],
    });
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.platformBalanceService.loadInitialBalances().subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (_) => {
        this.loading.set(false);
      },
    });
  }

  onVoucherPicked(event: Event) {
    const voucher = (event.target as HTMLInputElement).files![0];
    this.transferForm.patchValue({ file: voucher });
    this.voucherPicked.set(voucher);
  }

  onTransferSubmit() {
    this.loading.set(true);

    const transfer: IPlatformTransferReq = {
      ...this.transferForm.value,
      platformId: this.selectedPlatformBalance()?.platformId,
    };

    this.platformTransferService.register(transfer).subscribe({
      next: (res) => {
        this.transferForm.reset();
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
      },
    });
  }
}
