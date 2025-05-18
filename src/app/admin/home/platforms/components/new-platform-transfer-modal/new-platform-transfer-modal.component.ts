import { Component, signal, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IPlatformTransferReq } from '@models/platform.model';
import { PlatformTransferService } from '@services/platform-transfer.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { FormLoading } from '@utils/form-loading';
import { PlatformDetailService } from '../../services/platform-detail.service';

@Component({
  selector: 'app-new-platform-transfer-modal',
  templateUrl: './new-platform-transfer-modal.component.html',
  styleUrls: ['./new-platform-transfer-modal.component.css'],
})
export class NewPlatformTransferModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly loading = signal<boolean>(false);
  readonly form;
  readonly details;
  readonly date;
  readonly empty;

  constructor(
    private readonly fb: FormBuilder,
    private readonly platformDetailService: PlatformDetailService,
    private readonly platformTransferService: PlatformTransferService,
    private readonly formLoading: FormLoading
  ) {
    this.details = this.platformDetailService.details;
    this.date = this.platformDetailService.date;
    this.empty = this.platformDetailService.empty;

    this.form = this.fb.group({
      value: [, [Validators.required, Validators.min(0)]],
      date: [],
    });
  }

  open() {
    this.modal.open();
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const platformId = this.details()?.platform.id!;

    const dto: IPlatformTransferReq = {
      platformId,
      value: this.form.get('value')?.value!,
      date: this.date(),
    };

    this.platformTransferService.register(dto).subscribe({
      next: (transfer) => {
        this.form.reset();
        this.details.update((prevValue) => {
          prevValue?.transfers.push(transfer);
          return prevValue;
        });
        this.setLoading(false);
        this.modal.close();
      },
      error: (err) => {
        this.setLoading(false);
        console.log(err);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
