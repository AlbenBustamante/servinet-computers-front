import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBase } from '@models/base.model';
import { BaseService } from '@services/base.service';
import { SafeService } from '@services/safe.service';
import { UpdateSafeBaseService } from '@services/update-safe-base.service';

@Component({
  selector: 'app-update-base-form',
  templateUrl: './update-base-form.component.html',
  styleUrls: ['./update-base-form.component.css'],
})
export class UpdateBaseFormComponent {
  readonly safeDetail;
  readonly base;
  readonly form: FormGroup;

  constructor(
    private readonly baseService: BaseService,
    private readonly updateSafeBaseService: UpdateSafeBaseService,
    private readonly safeService: SafeService
  ) {
    this.base = this.baseService.cashBase;

    this.safeDetail = this.updateSafeBaseService.selectedSafe;
    this.form = this.updateSafeBaseService.form;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const safeDetailId = this.safeDetail()!.id;
    const base = this.form.value as IBase;

    this.safeService.updateBase({ safeDetailId, base }).subscribe({
      next: (safeDetail) => {
        this.safeDetail.set(safeDetail);
        console.log(safeDetail);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
