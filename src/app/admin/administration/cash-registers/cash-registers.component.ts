import {
  Component,
  computed,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {
  IAdmCashRegistersDto,
  ICloseCashRegisterDetailDto,
  IUpdateCashRegisterDetailBaseDto,
} from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { AdmItemCardOptions } from '../components/adm-item-card/adm-item-card.component';
import { CloseCashRegisterBaseModalComponent } from './components/close-cash-register-base-modal/close-cash-register-base-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashRegisterBaseService } from '@services/cash-register-base.service';
import { IBase } from '@models/base.model';
import { Router } from '@angular/router';
import { UpdateCashRegisterBaseModalComponent } from './components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { CashRegisterDetailStatus } from '@models/enums';

@Component({
  selector: 'app-admin-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  @ViewChild(CloseCashRegisterBaseModalComponent)
  closeCashRegisterModal!: CloseCashRegisterBaseModalComponent;
  @ViewChild(UpdateCashRegisterBaseModalComponent)
  updateCashRegisterBaseModal!: UpdateCashRegisterBaseModalComponent;

  readonly timeForm: FormGroup;
  readonly selectedCashRegisterDetail;
  readonly cashRegisterDetails = signal<IAdmCashRegistersDto | undefined>(
    undefined
  );
  readonly loading = signal<boolean>(false);
  readonly showDropdown = signal<boolean[]>([]);
  readonly initial = signal<boolean>(false);
  readonly faOptions = faEllipsis;

  readonly currentIndex = signal<number | undefined>(undefined);
  readonly pendingIndex = signal<number | undefined>(undefined);
  readonly remainingIndex = signal<number | undefined>(undefined);

  readonly currentOptions: AdmItemCardOptions = [
    {
      title: 'Actualizar Base Inicial',
      fn: () => this.openUpdateInitialBaseModal(),
    },
    {
      title: 'Actualizar Base Final',
      fn: () => this.openUpdateFinalBaseModal(),
    },
  ];
  readonly pendingOptions: AdmItemCardOptions = [
    { title: 'Cerrar caja', fn: () => this.openCloseCashRegisterModal() },
  ];
  readonly remainingOptions: AdmItemCardOptions = [...this.currentOptions];

  readonly length = computed(() => {
    const details = this.cashRegisterDetails();
    const current = details?.currentCashRegisters.length ?? 0;
    const pending = details?.pendingCashRegisters.length ?? 0;
    const remaining = details?.remainingCashRegisters.length ?? 0;

    return current + pending + remaining;
  });

  constructor(
    private readonly cashRegisterBaseService: CashRegisterBaseService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.selectedCashRegisterDetail =
      this.cashRegisterBaseService.selectedCashRegister;

    this.timeForm = this.fb.group({
      time: ['20:00', Validators.required],
    });
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getAdmCashRegisterDetails().subscribe({
      next: (cashRegisterDetails) => {
        this.cashRegisterDetails.set(cashRegisterDetails);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  setSelectedCashRegisterDetail(
    index: number,
    type: 'current' | 'pending' | 'remaining'
  ) {
    const {
      currentCashRegisters,
      pendingCashRegisters,
      remainingCashRegisters,
    } = this.cashRegisterDetails()!;

    switch (type) {
      case 'current':
        this.selectedCashRegisterDetail.set(currentCashRegisters[index]);
        this.currentIndex.set(
          index === this.currentIndex() ? undefined : index
        );
        this.pendingIndex.set(undefined);
        this.remainingIndex.set(undefined);
        break;
      case 'pending':
        this.selectedCashRegisterDetail.set(pendingCashRegisters[index]);
        this.pendingIndex.set(
          index === this.pendingIndex() ? undefined : index
        );
        this.currentIndex.set(undefined);
        this.remainingIndex.set(undefined);
        break;
      case 'remaining':
        this.selectedCashRegisterDetail.set(remainingCashRegisters[index]);
        this.remainingIndex.set(
          index === this.remainingIndex() ? undefined : index
        );
        this.currentIndex.set(undefined);
        this.pendingIndex.set(undefined);
        break;
      default:
        break;
    }
  }

  openUpdateInitialBaseModal() {
    this.initial.set(true);
    const { detailInitialBase } = this.selectedCashRegisterDetail()!;
    this.cashRegisterBaseService.calculate(detailInitialBase);
    this.updateCashRegisterBaseModal.open();
  }

  openUpdateFinalBaseModal() {
    this.initial.set(false);
    const { detailFinalBase, status } = this.selectedCashRegisterDetail()!;

    if (status !== CashRegisterDetailStatus.CLOSED) {
      return;
    }

    this.cashRegisterBaseService.calculate(detailFinalBase);
    this.updateCashRegisterBaseModal.open();
  }

  openCloseCashRegisterModal() {
    this.closeCashRegisterModal.open();
  }

  updateCashRegisterBase() {
    const form = this.cashRegisterBaseService.form;

    if (form.invalid) {
      return form.markAllAsTouched();
    }

    const { id } = this.selectedCashRegisterDetail()!;

    const dto: IUpdateCashRegisterDetailBaseDto = {
      base: form.value as unknown as IBase,
      initial: this.initial(),
    };

    this.cashRegisterDetailService.updateBase(id, dto).subscribe({
      next: (cashRegisterDetail) => {
        this.cashRegisterDetails.update((prevValue) => {
          const currentIndex = prevValue?.currentCashRegisters.findIndex(
            (detail) => detail.id === id
          );

          if (currentIndex != -1) {
            prevValue!.currentCashRegisters[currentIndex!] = cashRegisterDetail;
          } else {
            const pendingIndex = prevValue?.pendingCashRegisters.findIndex(
              (detail) => detail.id === id
            );

            if (pendingIndex != -1) {
              prevValue!.pendingCashRegisters[pendingIndex!] =
                cashRegisterDetail;
            } else {
              const remainingIndex =
                prevValue?.remainingCashRegisters.findIndex(
                  (detail) => detail.id === id
                );

              if (remainingIndex != -1) {
                prevValue!.remainingCashRegisters[remainingIndex!] =
                  cashRegisterDetail;
              }
            }
          }

          return prevValue;
        });

        this.updateCashRegisterBaseModal.close();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  closeCashRegisterDetail() {
    if (this.timeForm.invalid) {
      return this.timeForm.markAllAsTouched();
    }

    const form = this.cashRegisterBaseService.form;

    if (form.invalid) {
      return form.markAllAsTouched();
    }

    this.loading.set(true);

    const id = this.selectedCashRegisterDetail()?.id!;

    const closeCashRegisterDetail: ICloseCashRegisterDetailDto = {
      base: form.value as unknown as IBase,
      time: this.timeForm.value.time,
    };

    this.cashRegisterDetailService
      .close(id, closeCashRegisterDetail)
      .subscribe({
        next: (_) => {
          const route = 'admin/movimientos/caja-registradora';
          const detail = this.selectedCashRegisterDetail()!;
          this.closeCashRegisterModal.close();
          this.router.navigateByUrl(
            `${route}/${detail.cashRegister.id}/reportes/${detail.id}`
          );
          this.loading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.loading.set(false);
        },
      });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown')) {
      this.currentIndex.set(undefined);
    }

    if (!target.closest('.pending-dropdown')) {
      this.pendingIndex.set(undefined);
    }

    if (!target.closest('.remaining-dropdown')) {
      this.remainingIndex.set(undefined);
    }
  }
}
