import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformTransferReq, IPortalPlatform } from '@models/platform.model';
import { PlatformTransferService } from '@services/platform-transfer.service';
import { PlatformService } from '@services/platform.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-new-platform-transfer-form',
  templateUrl: './new-platform-transfer-form.component.html',
  styleUrls: ['./new-platform-transfer-form.component.css'],
})
export class NewPlatformTransferFormComponent {
  readonly transferForm: FormGroup;
  readonly loading = signal<boolean>(false);
  readonly vouchers: WritableSignal<File[]>;
  readonly portalPlatforms: WritableSignal<IPortalPlatform[]>;
  readonly selectedPortalPlatform: WritableSignal<IPortalPlatform | null>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformService: PlatformService,
    private readonly platformTransferService: PlatformTransferService,
    private readonly formLoading: FormLoading
  ) {
    this.vouchers = this.platformTransferService.vouchers;
    this.portalPlatforms = this.platformService.portalPlatforms;
    this.selectedPortalPlatform = this.platformService.selectedPortalPlatform;

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
    if (this.transferForm.invalid) {
      return this.transferForm.markAllAsTouched();
    }

    this.setLoading(true);

    const transfer: IPlatformTransferReq = {
      ...this.transferForm.value,
      platformId: this.selectedPortalPlatform()?.platformId,
    };

    this.platformTransferService.register(transfer).subscribe({
      next: (platformTransfer) => {
        const portalPlatforms = this.portalPlatforms();

        const index = portalPlatforms.findIndex(
          (portalPlatform) =>
            portalPlatform.platformId === platformTransfer.platform.id
        );

        if (index > -1) {
          const selectedPortalPlatform = this.selectedPortalPlatform()!;

          selectedPortalPlatform.transfersAmount++;
          selectedPortalPlatform.transfersTotal += platformTransfer.value;

          portalPlatforms[index] = selectedPortalPlatform;

          this.selectedPortalPlatform.set(selectedPortalPlatform);
          this.portalPlatforms.set(portalPlatforms);
        }

        this.transferForm.reset();
        this.vouchers.set([]);
        this.setLoading(false);
      },
      error: (_) => {
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.transferForm, this.loading, loading);
  }
}
