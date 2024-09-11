import { Component, computed, signal } from '@angular/core';
import { IBase } from '@models/base.model';
import {
  ICashRegisterDetailReq,
  ICashRegisterDetailRes,
  ICashRegisterRes,
} from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';

@Component({
  selector: 'app-my-cash',
  templateUrl: './my-cash.component.html',
  styleUrls: ['./my-cash.component.css'],
})
export class MyCashComponent {
  private workingHours!: string;
  private base!: IBase;
  private observation!: string;

  readonly loading = signal<boolean>(false);
  readonly registerLoading = signal<boolean>(false);
  readonly cashRegisterStatus = signal<
    'open' | 'opening' | 'available' | undefined
  >(undefined);
  readonly countingBase = signal<boolean>(false);
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);
  readonly selectedCashRegister = signal<ICashRegisterRes | undefined>(
    undefined
  );
  readonly cashRegisterDetail = signal<ICashRegisterDetailRes | null>(null);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.alreadyExists().subscribe({
      next: (res) => {
        if (res.alreadyExists) {
          this.cashRegisterStatus.set('open');
          this.cashRegisterDetail.set(res.cashRegisterDetail);
        } else {
          this.cashRegisterStatus.set('available');
          this.cashRegisters.set(res.cashRegisters);
        }

        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.log(error);
      },
    });
  }

  openCash(cashRegister: ICashRegisterRes) {
    this.selectedCashRegister.set(cashRegister);
    this.cashRegisterStatus.set('opening');
  }

  setWorkingHours(initialWorking: string) {
    if (initialWorking === '') {
      return;
    }

    this.workingHours = `${initialWorking};;;`;

    this.countingBase.set(true);
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
        this.cashRegisterDetail.set(cashRegisterDetail);
        this.countingBase.set(false);
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

  readonly headerTitle = computed(() => {
    const cashRegisterStatus = this.cashRegisterStatus();
    const cashRegisterDetail = this.cashRegisterDetail();

    if (cashRegisterStatus === undefined) {
      return '';
    }

    if (cashRegisterStatus === 'available') {
      return 'Cajas registradoras';
    }

    if (cashRegisterStatus === 'opening') {
      return 'Apertura de caja';
    }

    return `Caja ${cashRegisterDetail?.cashRegisterNumeral}`;
  });

  readonly headerDescription = computed(() => {
    const cashRegisterStatus = this.cashRegisterStatus();
    const countingBase = this.countingBase();

    if (cashRegisterStatus === undefined) {
      return '';
    }

    if (cashRegisterStatus === 'available') {
      return 'Por favor, selecciona la caja que vas a utilizar en el día';
    }

    if (cashRegisterStatus === 'opening') {
      return countingBase
        ? 'Cuenta o verifica la base inicial para finalizar la apertura de caja'
        : 'Completa los datos para abrir la caja';
    }

    return '¡Bienvenido/a!';
  });
}
