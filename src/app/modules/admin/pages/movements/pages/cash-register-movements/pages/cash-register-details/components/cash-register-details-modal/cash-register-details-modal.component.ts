import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CashRegisterDetailMovementService } from '@services/cash-register-detail-movement.service';

type SelectedType =
  | 'TRANSACTIONS'
  | 'EXPENSES'
  | 'DISCOUNTS'
  | 'TRANSFERS'
  | 'CHANGES';

@Component({
  selector: 'app-cash-register-details-modal',
  templateUrl: './cash-register-details-modal.component.html',
  styleUrls: ['./cash-register-details-modal.component.css'],
})
export class CashRegisterDetailsModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  private readonly movement;
  readonly selectedType = signal<SelectedType>('TRANSACTIONS');
  readonly types: { title: string; type: SelectedType }[] = [
    { title: 'Transacciones', type: 'TRANSACTIONS' },
    { title: 'Gastos', type: 'EXPENSES' },
    { title: 'Descuentos', type: 'DISCOUNTS' },
    { title: 'Transferencias', type: 'TRANSFERS' },
    { title: 'Cambios', type: 'CHANGES' },
  ];
  readonly faClose = faClose;

  constructor(
    private readonly cashRegisterDetailMovementService: CashRegisterDetailMovementService
  ) {
    this.movement = this.cashRegisterDetailMovementService.movement;
  }

  setSelectedType(type: SelectedType) {
    this.selectedType.set(type);
  }

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }

  get numeral() {
    return (
      this.movement()?.reports.cashRegisterDetail.cashRegister.numeral ?? 0
    );
  }
}
