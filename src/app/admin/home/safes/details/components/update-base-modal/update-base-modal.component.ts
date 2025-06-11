import { Component, computed, signal, ViewChild } from '@angular/core';
import { DetailService } from '../../../services/detail.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { IBase, IBaseDetail } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { SafeDetailService } from '@services/safe-detail.service';
import { FormLoading } from '@utils/form-loading';

@Component({
  selector: 'app-update-base-modal',
  templateUrl: './update-base-modal.component.html',
})
export class UpdateBaseModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly details;
  readonly baseDetail = signal<IBaseDetail | undefined>(undefined);
  readonly base;
  readonly form;
  readonly loading;

  readonly title = computed(() => {
    const details = this.details();

    return `Caja Fuerte N° ${details?.safe.numeral} - Actualizar Base`;
  });

  constructor(
    private readonly detailService: DetailService,
    private readonly baseService: BaseService,
    private readonly safeDetailService: SafeDetailService,
    private readonly formLoading: FormLoading
  ) {
    this.details = this.detailService.details;
    this.loading = this.detailService.loading;
    this.form = this.baseService.defaultForm();
    this.base = this.baseService.cashBase;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const { total } = this.baseService.calculate(this.form);
    this.baseDetail.set(total);
  }

  onSave() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.setLoading(true);

    const { id } = this.details()!;
    const base = this.form.value as unknown as IBase;

    this.safeDetailService.updateBase(id, base).subscribe({
      next: (safeDetail) => {
        this.details.set(safeDetail);
        this.modal.close();
        this.setLoading(false);
      },
      error: (err) => {
        console.error(err);
        this.setLoading(false);
      },
    });
  }

  open() {
    this.baseService.updateForm(this.form, this.details()?.detailFinalBase!);
    this.modal.open();
  }

  close() {
    this.form.reset();
    this.baseDetail.set(undefined);
    this.modal.close();
  }

  private setLoading(loading: boolean) {
    this.formLoading.setLoading(this.form, this.loading, loading);
  }
}
