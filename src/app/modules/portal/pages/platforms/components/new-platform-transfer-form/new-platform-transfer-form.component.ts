import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IPlatformBalanceRes,
  IPlatformTransferReq,
} from '@models/platform.model';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { PlatformTransferService } from '@services/platform-transfer.service';

@Component({
  selector: 'app-new-platform-transfer-form',
  templateUrl: './new-platform-transfer-form.component.html',
  styleUrls: ['./new-platform-transfer-form.component.css'],
})
export class NewPlatformTransferFormComponent {
  readonly transferForm: FormGroup;
  readonly loading = signal<boolean>(false);
  readonly vouchers: WritableSignal<File[]>;
  readonly selectedPlatformBalance: WritableSignal<IPlatformBalanceRes | null>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformBalanceService: PlatformBalanceService,
    private readonly platformTransferService: PlatformTransferService
  ) {
    this.vouchers = this.platformTransferService.vouchers;

    this.selectedPlatformBalance =
      this.platformBalanceService.selectedPlatformBalance;

    this.transferForm = this.fb.group({
      value: ['', Validators.required],
    });
  }

  onPickVouchers(event: Event) {
    const voucherFiles = (event.target as HTMLInputElement).files!;
    const vouchers: File[] = [];

    for (let i = 0; i < voucherFiles.length; i++) {
      vouchers.push(voucherFiles[i]);
    }

    this.vouchers.set(vouchers);
  }

  onTransferSubmit() {
    this.loading.set(true);

    const transfer: IPlatformTransferReq = {
      ...this.transferForm.value,
      platformId: this.selectedPlatformBalance()?.platformId,
    };

    this.platformTransferService.register(transfer).subscribe({
      next: (_) => {
        this.transferForm.reset();
        this.vouchers.set([]);
        this.loading.set(false);
      },
      error: (_) => {
        this.loading.set(false);
      },
    });
  }
}
