import { Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ICashRegisterDetailRes,
  ICashRegisterDetailReportsAndMovementsDto,
} from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private _cashRegisterId = 0;
  readonly loading = signal<boolean>(false);
  readonly details = signal<ICashRegisterDetailRes[]>([]);
  readonly reports = signal<
    ICashRegisterDetailReportsAndMovementsDto | undefined
  >(undefined);
  readonly date = signal<Date>(new Date());
  readonly initial = signal<boolean>(false);
  readonly timeForm;

  constructor(private readonly fb: FormBuilder) {
    this.timeForm = this.fb.group({
      time: ['20:00', Validators.required],
    });
  }

  set cashRegisterId(id: number) {
    this._cashRegisterId = id;
  }

  get cashRegisterId() {
    return this._cashRegisterId;
  }
}
