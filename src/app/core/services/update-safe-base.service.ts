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
    const base = safeDetail.detailFinalBase;

    this.form.setValue({
      hundredThousand: base.hundredThousand,
      fiftyThousand: base.fiftyThousand,
      twentyThousand: base.twentyThousand,
      tenThousand: base.tenThousand,
      fiveThousand: base.fiveThousand,
      twoThousand: base.twoThousand,
      thousand: base.thousand,
      fiveHundred: base.fiveHundred,
      twoHundred: base.twoHundred,
      hundred: base.hundred,
      fifty: base.fifty,
    });

    this.selectedSafe.set(safeDetail);
  }
}
