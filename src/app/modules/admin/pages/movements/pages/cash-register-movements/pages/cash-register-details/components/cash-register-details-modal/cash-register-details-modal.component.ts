import {
  Component,
  ElementRef,
  Input,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { IDetailedCashRegisterReportsDto } from '@models/cash-register.model';

type SelectedType = 'TRANSACTIONS' | 'EXPENSES' | 'DISCOUNTS' | 'TRANSFERS';

@Component({
  selector: 'app-cash-register-details-modal',
  templateUrl: './cash-register-details-modal.component.html',
  styleUrls: ['./cash-register-details-modal.component.css'],
})
export class CashRegisterDetailsModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) reports!: Signal<
    IDetailedCashRegisterReportsDto | undefined
  >;
  readonly selectedType = signal<SelectedType>('TRANSACTIONS');
  readonly types: { title: string; type: SelectedType }[] = [
    { title: 'Transacciones', type: 'TRANSACTIONS' },
    { title: 'Gastos', type: 'EXPENSES' },
    { title: 'Descuentos', type: 'DISCOUNTS' },
    { title: 'Transferencias', type: 'TRANSFERS' },
  ];

  setSelectedType(type: SelectedType) {
    this.selectedType.set(type);
  }

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
