import { Component, signal } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { AdmItemCardOptions } from '../../components/adm-item-card/adm-item-card.component';

@Component({
  selector: 'app-admin-cash-registers',
  templateUrl: './cash-registers.component.html',
  styleUrls: ['./cash-registers.component.css'],
})
export class CashRegistersComponent {
  readonly cashRegisterDetails = signal<ICashRegisterDetailRes[]>([]);
  readonly loading = signal<boolean>(false);
  readonly showDropdown = signal<boolean[]>([]);
  readonly faOptions = faEllipsis;
  readonly selectedCashRegisterDetail = signal<
    ICashRegisterDetailRes | undefined
  >(undefined);

  readonly options: AdmItemCardOptions = [];

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

    this.selectedCashRegisterDetail.set(this.cashRegisterDetails()[index]);
    // this.updateSafeBaseService.setSelectedSafe(
    // this.selectedCashRegisterDetail()!
    // );
  }

  openUpdateBaseModal() {
    // this.updateBaseModal.open();
  }
  setSelectedCashRegisterDetail(index: number) {}
}
