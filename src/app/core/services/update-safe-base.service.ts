import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISafeDetailRes } from '@models/safe.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateSafeBaseService {
  readonly form: FormGroup;
  readonly selectedSafe = signal<ISafeDetailRes | undefined>(undefined);

  constructor(private readonly fb: FormBuilder) {
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
    this.form.setValue({
      hundredThousand: safeDetail.detailFinalBase.hundredThousand,
      fiftyThousand: safeDetail.detailFinalBase.fiftyThousand,
      twentyThousand: safeDetail.detailFinalBase.twentyThousand,
      tenThousand: safeDetail.detailFinalBase.tenThousand,
      fiveThousand: safeDetail.detailFinalBase.fiveThousand,
      twoThousand: safeDetail.detailFinalBase.twoThousand,
      thousand: safeDetail.detailFinalBase.thousand,
      fiveHundred: safeDetail.detailFinalBase.fiveHundred,
      twoHundred: safeDetail.detailFinalBase.twoHundred,
      hundred: safeDetail.detailFinalBase.hundred,
      fifty: safeDetail.detailFinalBase.fifty,
    });

    this.selectedSafe.set(safeDetail);
  }
}
