import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBase } from '@models/base.model';
import { ICashRegisterRes } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-my-cash',
  templateUrl: './my-cash.component.html',
  styleUrls: ['./my-cash.component.css'],
})
export class MyCashComponent {
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
          this.cashRegisterService.getAll(true).subscribe({
            next: (res) => this.cashRegisters.set(res),
            error: (error) => console.log(error),
          });
        }
      },
      error: (error) => console.log(error),
    });
  }

  openCash(cashRegister: ICashRegisterRes) {
    this.selectedCashRegister.set(cashRegister);
    this.cashRegisterStatus.set('opening');
  }

  setInitialWorking() {
    if (this.initialWorkingForm.invalid) {
      return this.initialWorkingForm.markAllAsTouched();
    }

    this.isCountingBase.set(true);
  }

  finish(base: IBase) {
    console.log(base);
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

    if (this.cashRegisterStatus() === 'opening') {
      return 'Completa los datos para abrir la caja';
    }

    return '¡Bienvenido/a!';
  }
}
