import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBase } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { SafeDetailService } from '@services/safe-detail.service';
import { SafeBaseService } from '@services/safe-base.service';

@Component({
  selector: 'app-update-base-form',
  templateUrl: './update-base-form.component.html',
  styleUrls: ['./update-base-form.component.css'],
})
export class UpdateBaseFormComponent {
  readonly safeDetails;
  readonly selectedSafeDetail;
  readonly base;
  readonly form: FormGroup;

  constructor(
    private readonly baseService: BaseService,
    private readonly safeBaseService: SafeBaseService,
    private readonly safeDetailService: SafeDetailService
  ) {
    this.form = this.safeBaseService.form;
    this.base = this.baseService.cashBase;
    this.selectedSafeDetail = this.safeBaseService.selectedSafe;
    this.safeDetails = this.safeBaseService.safeDetails;

    this.base.set(this.baseService.defaultBase());
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const safeDetailId = this.selectedSafeDetail()!.id;
    const base = this.form.value as IBase;

    this.safeDetailService.updateBase(safeDetailId, base).subscribe({
      next: (safeDetail) => {
        this.baseService.calculate(this.form, true);
        this.selectedSafeDetail.set(safeDetail);

        const index = this.safeDetails().findIndex(
          (detail) => detail.id === safeDetail.id
        );

        if (index >= 0) {
          this.safeDetails.update((prevValue) => {
            prevValue[index] = safeDetail;
            return prevValue;
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
