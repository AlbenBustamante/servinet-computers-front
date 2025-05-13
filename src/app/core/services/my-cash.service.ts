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

  private readonly _selectedCashRegister = signal<ICashRegisterRes | undefined>(
    undefined
  );

  private readonly INITIAL_WORKING = 'iW';
  private readonly OBSERVATION = 'ob';
  private readonly INITIAL_BASE = 'iB';
  private readonly SELECTED_CASH_REGISTER = 'sCR';
  private readonly CLOSING = 'cs';
  private readonly CLOSED_REPORTS = 'cR';
  private readonly EXPIRATION_TIME = 'eT';

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
  readonly myClosedCashRegisterReports = signal<
    ICashRegisterDetailReportsDto | undefined
  >(undefined);
  readonly currentCashRegister = signal<
    ICashRegisterDetailReportsDto | undefined
  >(undefined);

  constructor() {}

  set initialWorking(initialWorking: string) {
    this._initialWorking = initialWorking;
    localStorage.setItem(this.INITIAL_WORKING, this._initialWorking);
  }

  get initialWorking() {
    this._initialWorking = localStorage.getItem(this.INITIAL_WORKING) ?? '';

    return this._initialWorking;
  }

  removeInitialWorking() {
    this._initialWorking = '';
    localStorage.removeItem(this.INITIAL_WORKING);
  }

  set observation(observation: string) {
    this._observation = observation;
    localStorage.setItem(this.OBSERVATION, observation);
  }

  get observation() {
    this._observation = localStorage.getItem(this.OBSERVATION) ?? '';

    return this._observation;
  }

  removeObservation() {
    this._observation = '';
    localStorage.removeItem(this.OBSERVATION);
  }

  set initialBase(initialBase: IBase) {
    this._initialBase = initialBase;
    localStorage.setItem(this.INITIAL_BASE, JSON.stringify(initialBase));
  }

  get initialBase(): IBase | undefined {
    const base = localStorage.getItem(this.INITIAL_BASE);
    this._initialBase = base !== null ? JSON.parse(base) : undefined;

    return this._initialBase;
  }

  removeInitialBase() {
    this._initialBase = undefined;
    localStorage.removeItem(this.INITIAL_BASE);
  }

  setSelectedCashRegister(cashRegister: ICashRegisterRes) {
    this._selectedCashRegister.set(cashRegister);

    localStorage.setItem(
      this.SELECTED_CASH_REGISTER,
      JSON.stringify(cashRegister)
    );
  }

  getSelectedCashRegister() {
    const selectedCashRegister = localStorage.getItem(
      this.SELECTED_CASH_REGISTER
    );

    this._selectedCashRegister.set(
      selectedCashRegister ? JSON.parse(selectedCashRegister) : undefined
    );

    return this._selectedCashRegister;
  }

  removeSelectedCashRegister() {
    this._selectedCashRegister.set(undefined);
    localStorage.removeItem(this.SELECTED_CASH_REGISTER);
  }

  set closingCashRegister(id: number) {
    localStorage.setItem(this.CLOSING, `${id}`);
  }

  get closingCashRegister() {
    return Number(localStorage.getItem(this.CLOSING) ?? 0);
  }

  removeClosingCashRegister() {
    localStorage.removeItem(this.CLOSING);
  }

  setClosedReports(reports: ICashRegisterDetailReportsDto) {
    this.removeClosingCashRegister();
    this.myClosedCashRegisterReports.set(reports);
    localStorage.setItem(this.CLOSED_REPORTS, '1');
  }

  getClosedReports() {
    return !!localStorage.getItem(this.CLOSED_REPORTS);
  }

  removeClosedReports() {
    localStorage.removeItem(this.CLOSED_REPORTS);
  }

  initTime() {
    const minutes = 60;
    const expirationTime = minutes * 60 * 1000;

    const time = Date.now() + expirationTime;

    localStorage.setItem(this.EXPIRATION_TIME, time.toString());
  }

  isExpired() {
    const expirationStorage = localStorage.getItem(this.EXPIRATION_TIME);

    if (!expirationStorage) {
      return false;
    }

    const expirationTime = +expirationStorage;
    const isExpired = Date.now() > expirationTime;

    console.log('Expiration Time', expirationTime, 'Expired', isExpired);

    return isExpired;
  }

  removeExpirationTime() {
    localStorage.removeItem(this.EXPIRATION_TIME);
  }

  clear() {
    this.removeInitialWorking();
    this.removeObservation();
    this.removeInitialBase();
    this.removeSelectedCashRegister();
    this.removeClosingCashRegister();
    this.removeClosedReports();
    this.removeExpirationTime();
  }
}
