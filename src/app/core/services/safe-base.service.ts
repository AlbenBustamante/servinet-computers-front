import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISafeDetailRes } from '@models/safe.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SafeBaseService {
  readonly form: FormGroup;
  readonly safeDetails = signal<ISafeDetailRes[]>([]);
  readonly selectedSafe = signal<ISafeDetailRes | undefined>(undefined);

  constructor(private readonly baseService: BaseService) {
    this.form = this.baseService.defaultForm();
  }

  setSelectedSafe(safeDetail: ISafeDetailRes) {
    const base = safeDetail.detailFinalBase;
    this.baseService.updateForm(this.form, base);
    this.baseService.calculate(this.form, true);
    this.selectedSafe.set(safeDetail);
  }
}
