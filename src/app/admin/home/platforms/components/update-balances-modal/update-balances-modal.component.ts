import { Component, signal, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlatformBalanceService } from '@services/platform-balance.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { FormLoading } from '@utils/form-loading';
import { DetailService } from '../../services/detail.service';
import { IUpdatePlatformBalanceDto } from '@models/platform.model';

@Component({
  selector: 'app-update-balances-modal',
  templateUrl: './update-balances-modal.component.html',
})
export class UpdateBalancesModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly details;
  readonly form;
  readonly date;
  readonly empty;
  readonly loading;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: DetailService,
    private readonly platformBalanceService: PlatformBalanceService,
    private readonly formLoading: FormLoading
  ) {
    this.details = this.service.details;
    this.date = this.service.date;
    this.empty = this.service.empty;
    this.loading = this.service.loading;

    this.form = this.fb.group({
      initialBalance: [0, Validators.required],
      finalBalance: [0, Validators.required],
    });
  }

  open() {
    this.modal.open();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.setLoading(true);

    const dto: IUpdatePlatformBalanceDto = {
      initialBalance: this.form.get('initialBalance')?.value!,
      finalBalance: this.form.get('finalBalance')?.value!,
    };

    const { id } = this.details()?.balances[0]!;

    this.platformBalanceService.update(id, dto).subscribe({
      next: (balance) => {
        this.details.update((prevValue) => {
          prevValue!.balances[0] = balance;

          return prevValue;
        });

        this.setLoading(false);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        this.setLoading(false);
      },
    });
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
