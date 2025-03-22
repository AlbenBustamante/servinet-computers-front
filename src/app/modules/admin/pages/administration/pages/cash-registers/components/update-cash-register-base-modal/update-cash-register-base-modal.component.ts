import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CashRegisterBaseService } from '@services/cash-register-base.service';

@Component({
  selector: 'app-update-cash-register-base-modal',
  templateUrl: './update-cash-register-base-modal.component.html',
  styleUrls: ['./update-cash-register-base-modal.component.css'],
})
export class UpdateCashRegisterBaseModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Output() onSubmit = new EventEmitter<void>();
  readonly cashRegisterDetail;

  constructor(
    private readonly cashRegisterBaseService: CashRegisterBaseService
  ) {
    this.cashRegisterDetail = this.cashRegisterBaseService.selectedCashRegister;
  }

  submit() {
    this.onSubmit.emit();
  }

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.cashRegisterBaseService.resetBase();
    this.modal.nativeElement.close();
  }
}
