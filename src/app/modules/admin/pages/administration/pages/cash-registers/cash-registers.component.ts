import { Component, HostListener, signal, ViewChild } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {
  IAdmCashRegistersDto,
  ICashRegisterDetailRes,
  ICloseCashRegisterDetailDto,
} from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { AdmItemCardOptions } from '../../components/adm-item-card/adm-item-card.component';
import { UpdateCashRegisterBaseModalComponent } from './components/update-cash-register-base-modal/update-cash-register-base-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CashRegisterBaseService } from '@services/cash-register-base.service';
import { IBase } from '@models/base.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  @ViewChild(UpdateCashRegisterBaseModalComponent)
  updateBaseModal!: UpdateCashRegisterBaseModalComponent;
  readonly timeForm: FormGroup;
  readonly cashRegisterDetails = signal<IAdmCashRegistersDto | undefined>(
    undefined
  );
  readonly loading = signal<boolean>(false);
  readonly showDropdown = signal<boolean[]>([]);
  readonly faOptions = faEllipsis;
  readonly currentIndex = signal<number | undefined>(undefined);
  readonly pendingIndex = signal<number | undefined>(undefined);
  readonly selectedCashRegisterDetail = signal<
    ICashRegisterDetailRes | undefined
  >(undefined);
  readonly options: AdmItemCardOptions = [];
  readonly pendingOptions: AdmItemCardOptions = [
    ...this.options,
    { title: 'Cerrar caja', fn: () => this.openUpdateBaseModal() },
  ];

  constructor(
    private readonly cashRegisterBaseService: CashRegisterBaseService,
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.timeForm = this.fb.group({
      time: ['20:00', Validators.required],
    });
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterDetailService.getAllOfToday().subscribe({
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

  toggleShowDropdown(index: number) {
    this.showDropdown.update((values) => {
      const newValues = values.map((value, i) => (value ? false : index === i));

      return newValues;
    });
  }

  openUpdateBaseModal() {
    this.updateBaseModal.open();
  }

  setSelectedCashRegisterDetail(index: number, pending: boolean) {
    const { currentCashRegisters, pendingCashRegisters } =
      this.cashRegisterDetails()!;

    const selectedItem = pending
      ? pendingCashRegisters[index]
      : currentCashRegisters[index];

    this.selectedCashRegisterDetail.set(selectedItem);

    if (pending) {
      this.pendingIndex.set(index === this.pendingIndex() ? undefined : index);
      this.currentIndex.set(undefined);
    } else {
      this.currentIndex.set(index === this.currentIndex() ? undefined : index);
      this.pendingIndex.set(undefined);
    }
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
          this.updateBaseModal.close();
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
  }
}
