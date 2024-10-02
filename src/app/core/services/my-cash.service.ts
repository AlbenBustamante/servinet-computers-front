import { Injectable, signal } from '@angular/core';
import { IBase } from '@models/base.model';
import {
  ICashRegisterDetailReportsDto,
  ICashRegisterDetailRes,
  ICashRegisterRes,
  IMyCashRegistersReports,
} from '@models/cash-register.model';

@Injectable({
  providedIn: 'root',
})
export class MyCashService {
  private _initialWorking = '';
  private _observation = '';
  private _initialBase: IBase | undefined = undefined;
  private _closing = false;

  private readonly _selectedCashRegister = signal<ICashRegisterRes | undefined>(
    undefined
  );

  private readonly initialWorkingStorage = 'iW';
  private readonly observationStorage = 'ob';
  private readonly initialBaseStorage = 'iB';
  private readonly selectedCashRegisterStorage = 'sCR';
  private readonly closingStorage = 'cs';
  private readonly closedReportsStorage = 'cR';

  readonly cashRegisterStatus = signal<
    | 'open'
    | 'selecting'
    | 'entry-time'
    | 'counting'
    | 'final-base'
    | 'final-report'
    | undefined
  >(undefined);

  readonly cashRegisters = signal<ICashRegisterRes[]>([]);
  readonly myCashRegisters = signal<IMyCashRegistersReports | undefined>(
    undefined
  );
  readonly myClosingCashRegister = signal<ICashRegisterDetailRes | undefined>(
    undefined
  );
  readonly myClosedCashRegisterReports = signal<
    ICashRegisterDetailReportsDto | undefined
  >(undefined);

  constructor() {}

  set initialWorking(initialWorking: string) {
    this._initialWorking = initialWorking;
    localStorage.setItem(this.initialWorkingStorage, this._initialWorking);
  }

  get initialWorking() {
    this._initialWorking =
      localStorage.getItem(this.initialWorkingStorage) ?? '';

    return this._initialWorking;
  }

  removeInitialWorking() {
    this._initialWorking = '';
    localStorage.removeItem(this.initialWorkingStorage);
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

  set closing(closing: boolean) {
    this._closing = closing;
    localStorage.setItem(this.closingStorage, String(this._closing));
  }

  get closing() {
    this._closing = Boolean(localStorage.getItem(this.closingStorage)) ?? false;
    return this._closing;
  }

  removeClosing() {
    this._closing = false;
    localStorage.removeItem(this.closingStorage);
  }

  setClosedReports(reports: ICashRegisterDetailReportsDto) {
    this.removeClosing();
    this.myClosedCashRegisterReports.set(reports);
    localStorage.setItem(this.closedReportsStorage, '1');
  }

  getClosedReports() {
    return !!localStorage.getItem(this.closedReportsStorage);
  }

  removeClosedReports() {
    localStorage.removeItem(this.closedReportsStorage);
  }

  clear() {
    this.removeInitialWorking();
    this.removeObservation();
    this.removeInitialBase();
    this.removeSelectedCashRegister();
    this.removeClosing();
    this.removeClosedReports();
  }
}
