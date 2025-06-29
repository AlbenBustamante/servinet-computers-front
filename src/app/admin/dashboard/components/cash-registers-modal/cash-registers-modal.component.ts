import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-cash-registers-modal',
  templateUrl: './cash-registers-modal.component.html',
})
export class CashRegistersModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
