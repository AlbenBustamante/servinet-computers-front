import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modalId!: string;
  @Input() modalTitle!: string | undefined;
  myModal!: HTMLDialogElement;

  closeModal() {
    this.modal.close();
  }

  private get modal() {
    if (!this.myModal) {
      this.myModal = document.querySelector(
        `#${this.modalId}`
      ) as HTMLDialogElement;
    }

    return this.myModal;
  }
}
