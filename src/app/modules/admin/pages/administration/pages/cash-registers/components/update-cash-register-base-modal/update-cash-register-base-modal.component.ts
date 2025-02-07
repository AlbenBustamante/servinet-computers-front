import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-update-cash-register-base-modal',
  templateUrl: './update-cash-register-base-modal.component.html',
  styleUrls: ['./update-cash-register-base-modal.component.css'],
})
export class UpdateCashRegisterBaseModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) cashRegisterDetail!:
    | ICashRegisterDetailRes
    | undefined;

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
