import { Component, HostListener, signal, ViewChild } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import {
  IAdmCashRegistersDto,
  ICashRegisterDetailRes,
} from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { AdmItemCardOptions } from '../../components/adm-item-card/adm-item-card.component';
import { UpdateCashRegisterBaseModalComponent } from './components/update-cash-register-base-modal/update-cash-register-base-modal.component';

@Component({
  selector: 'app-admin-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  @ViewChild(UpdateCashRegisterBaseModalComponent)
  updateBaseModal!: UpdateCashRegisterBaseModalComponent;
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
  readonly options: AdmItemCardOptions = [
    { title: 'Cerrar caja', fn: this.openUpdateBaseModal },
  ];

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService
  ) {}

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

    //this.selectedCashRegisterDetail.set(this.cashRegisterDetails()[index]);
    // this.updateSafeBaseService.setSelectedSafe(
    // this.selectedCashRegisterDetail()!
    // );
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
