import { Injectable, signal } from '@angular/core';
import { IBase } from '@models/base.model';
import {
  ICashRegisterDetailRes,
  ICashRegisterRes,
} from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class MyCashService {
  private _workingHours = '';
  private _observation = '';
  private _initialBase: IBase | undefined = undefined;

  private readonly _selectedCashRegister = signal<ICashRegisterRes | undefined>(
    undefined
  );

  private readonly workingHoursStorage = 'wH';
  private readonly observationStorage = 'ob';
  private readonly initialBaseStorage = 'ib';
  private readonly selectedCashRegisterStorage = 'sCR';

  readonly cashRegisterStatus = signal<
    'open' | 'selecting' | 'entry-time' | 'counting' | undefined
  >(undefined);

  readonly cashRegisters = signal<ICashRegisterRes[]>([]);
  readonly myCashRegisters = signal<ICashRegisterDetailRes[]>([]);

  constructor() {}

  set workingHours(workingHours: string) {
    this._workingHours = workingHours;
    localStorage.setItem(this.workingHoursStorage, workingHours);
  }

  get workingHours() {
    this._workingHours = localStorage.getItem(this.workingHoursStorage) ?? '';

    return this._workingHours;
  }

  removeWorkingHours() {
    this._workingHours = '';
    localStorage.removeItem(this.workingHoursStorage);
  }

  set observation(observation: string) {
    this._observation = observation;
    localStorage.setItem(this.observationStorage, observation);
  }

  get observation() {
    this._observation = localStorage.getItem(this.observationStorage) ?? '';

    return this._observation;
  }

  removeObservation() {
    this._observation = '';
    localStorage.removeItem(this.observationStorage);
  }

  set initialBase(initialBase: IBase) {
    this._initialBase = initialBase;
    localStorage.setItem(this.initialBaseStorage, JSON.stringify(initialBase));
  }

  get initialBase(): IBase | undefined {
    const base = localStorage.getItem(this.initialBaseStorage);
    this._initialBase = base ? JSON.parse(base) : undefined;

    return this._initialBase;
  }

  removeInitialBase() {
    this._initialBase = undefined;
    localStorage.removeItem(this.initialBaseStorage);
  }

  setSelectedCashRegister(cashRegister: ICashRegisterRes) {
    this._selectedCashRegister.set(cashRegister);
    localStorage.setItem(
      this.selectedCashRegisterStorage,
      JSON.stringify(cashRegister)
    );
  }

  getSelectedCashRegister() {
    const selectedCashRegister = localStorage.getItem(
      this.selectedCashRegisterStorage
    );

    this._selectedCashRegister.set(
      selectedCashRegister ? JSON.parse(selectedCashRegister) : undefined
    );

    return this._selectedCashRegister;
  }

  removeSelectedCashRegister() {
    this._selectedCashRegister.set(undefined);
    localStorage.removeItem(this.selectedCashRegisterStorage);
  }

  clear() {
    this.removeWorkingHours();
    this.removeObservation();
    this.removeInitialBase();
    this.removeSelectedCashRegister();
  }
}
