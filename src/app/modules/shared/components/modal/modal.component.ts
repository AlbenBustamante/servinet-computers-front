import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input({ required: true }) modalTitle!: string | undefined;
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }
}
