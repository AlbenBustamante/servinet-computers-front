import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import {
  ICashRegisterDetailReq,
  ICashRegisterRes,
} from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-my-cash',
  templateUrl: './my-cash.component.html',
  styleUrls: ['./my-cash.component.css'],
})
export class MyCashComponent {
  private workingHours!: string;
  private base!: IBase;
  private observation!: string;
  readonly registerLoading = signal<boolean>(false);
  readonly cashRegisterStatus = signal<'open' | 'opening' | 'available'>(
    'available'
  );
  readonly isCountingBase = signal<boolean>(false);
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);
  readonly selectedCashRegister = signal<ICashRegisterRes | undefined>(
    undefined
  );
  readonly initialWorkingForm: FormGroup;

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly cashRegisterService: CashRegisterService,
    private readonly fb: FormBuilder
  ) {
    this.initialWorkingForm = this.fb.group({
      initialWorking: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cashRegisterDetailService.isAlreadyCreated().subscribe({
      next: (alreadyExists) => {
        this.cashRegisterStatus.set(alreadyExists ? 'open' : 'available');

        if (!alreadyExists) {
          this.cashRegisterService.getAll().subscribe({
            next: (res) => this.cashRegisters.set(res),
            error: (error) => console.log(error),
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openCash(cashRegister: ICashRegisterRes) {
    this.selectedCashRegister.set(cashRegister);
    this.cashRegisterStatus.set('opening');
  }

  setWorkingHours() {
    if (this.initialWorkingForm.invalid) {
      return this.initialWorkingForm.markAllAsTouched();
    }

    const hours = this.initialWorkingForm.value;

    this.workingHours = `${hours.initialWorking};;;`;

    this.isCountingBase.set(true);
  }

  setBase(base: IBase) {
    this.base = base;
  }

  setObservation(observation: string) {
    this.observation = observation;
  }

  register() {
    this.registerLoading.set(true);

    const detailReq: ICashRegisterDetailReq = {
      cashRegisterId: this.selectedCashRegister()!.id,
      workingHours: this.workingHours,
      initialBase: this.base,
      baseObservation: this.observation,
    };

    this.cashRegisterDetailService.register(detailReq).subscribe({
      next: (cashRegisterDetail) => {
        this.isCountingBase.set(false);
        this.cashRegisterStatus.set('open');
        this.registerLoading.set(false);
        console.log(cashRegisterDetail);
      },
      error: (err) => {
        console.log(err);
        this.registerLoading.set(false);
      },
    });
  }

  get headerTitle() {
    if (this.cashRegisterStatus() === 'available') {
      return 'Cajas registradoras';
    }

    if (this.cashRegisterStatus() === 'opening') {
      return 'Apertura de caja';
    }

    return 'Caja 1';
  }

  get headerDescription() {
    if (this.cashRegisterStatus() === 'available') {
      return 'Por favor, selecciona la caja que vas a utilizar en el día';
    }

    if (this.cashRegisterStatus() === 'opening' && !this.isCountingBase()) {
      return 'Completa los datos para abrir la caja';
    }

    if (this.cashRegisterStatus() === 'opening' && this.isCountingBase()) {
      return 'Cuenta o verifica la base inicial para finalizar la apertura de caja';
    }

    return '¡Bienvenido/a!';
  }
}
