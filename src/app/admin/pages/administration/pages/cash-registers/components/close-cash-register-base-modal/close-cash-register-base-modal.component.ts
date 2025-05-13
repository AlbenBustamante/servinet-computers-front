import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CashRegisterBaseService } from '@services/cash-register-base.service';

@Component({
  selector: 'app-close-cash-register-base-modal',
  templateUrl: './close-cash-register-base-modal.component.html',
  styleUrls: ['./close-cash-register-base-modal.component.css'],
})
export class CloseCashRegisterBaseModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Output() onSubmit = new EventEmitter();
  @Input({ required: true }) timeForm!: FormGroup;
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
