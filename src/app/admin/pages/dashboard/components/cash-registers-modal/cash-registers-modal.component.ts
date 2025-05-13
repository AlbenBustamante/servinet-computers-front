import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cash-registers-modal',
  templateUrl: './cash-registers-modal.component.html',
  styleUrls: ['./cash-registers-modal.component.css'],
})
export class CashRegistersModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
