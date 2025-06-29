import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-platforms-modal',
  templateUrl: './platforms-modal.component.html',
})
export class PlatformsModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
