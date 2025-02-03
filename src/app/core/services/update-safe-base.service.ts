import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISafeDetailRes } from '@models/safe.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateSafeBaseService {
  readonly form: FormGroup;
  readonly selectedSafe = signal<ISafeDetailRes | undefined>(undefined);

  constructor(
    private readonly fb: FormBuilder,
    private readonly baseService: BaseService
  ) {
    this.form = this.fb.group({
      hundredThousand: ['', Validators.min(0)],
      fiftyThousand: ['', Validators.min(0)],
      twentyThousand: ['', Validators.min(0)],
      tenThousand: ['', Validators.min(0)],
      fiveThousand: ['', Validators.min(0)],
      twoThousand: ['', Validators.min(0)],
      thousand: ['', Validators.min(0)],
      fiveHundred: ['', Validators.min(0)],
      twoHundred: ['', Validators.min(0)],
      hundred: ['', Validators.min(0)],
      fifty: ['', Validators.min(0)],
    });
  }

  setSelectedSafe(safeDetail: ISafeDetailRes) {
    const base = safeDetail.detailFinalBase;
    this.baseService.updateForm(this.form, base);
    this.baseService.calculate(this.form, true);
    this.selectedSafe.set(safeDetail);
  }
}
